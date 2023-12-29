import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import {db, connectToDb} from './db.js';
import path from 'path';
import 'dotenv/config';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
    );

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

//middleware for checking credentials
app.use(async(req, res, next) => {
    const { authtoken } = req.headers;
    if(authtoken){
        try{
            req.user = await admin.auth().verifyIdToken(authtoken);
        }  catch (e) {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};
    next();
});
// app.use(cors());

//get all articles
app.get('/api/articles',async(req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').find({}).toArray();

    if(article){       
        res.json(article);
    }else{
        res.sendStatus(404);
    }
    
});

//get article endpoint
app.get('/api/articles/:name',async(req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if(article){
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && upvoteIds.includes(uid);        
        res.json(article);
    }else{
        res.sendStatus(404);
    }
    
});

//middleware for upvote and comment
app.use(async(req, res,next)=>{
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
});

//update upvote endpoint
app.put('/api/articles/:name/upvote',async(req,res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });
    
    if(article){
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);

        if(canUpvote){
            await db.collection('articles').updateOne({ name },{
                $inc: { upvotes: 1},
                $push: { upvoteIds: uid},
            });
        }
        const updatedArticle = await db.collection('articles').findOne({name});
        res.json(updatedArticle);
    } else {
        res.send(`That article does not exist`);
    }
});
    
//update downvote endpoint
app.put('/api/articles/:name/downvote',async(req,res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });
    
    if(article){
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);

        if(!canUpvote){
            await db.collection('articles').updateOne({ name },{
                $inc: { upvotes: -1},
                $pull: { upvoteIds: uid},
            });
        }
        const updatedArticle = await db.collection('articles').findOne({name});
        res.json(updatedArticle);
    } else {
        res.send(`That article does not exist`);
    }
});

//update comment endpoint
app.post('/api/articles/:name/comments',async(req,res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;
    
    await db.collection('articles').updateOne({ name },{
        $push: { comments: { postedBy: email, text } }, 
    });
    
    const article = await db.collection('articles').findOne({ name });

    if(article){
        res.json(article);
    }else{
        res.send(`That article does not exist`);
    }

});

//update new article endpoint
app.post('/api/articles/:name',async(req,res) =>{
    const { name } = req.params;
    const content = req.body.content;
    
    const newobj = {
        name: name,
        title: name,
        upvotes: 0,
        comments: [],
        content: content,
    }

    await db.collection('articles').insertOne(newobj);
    
    const article = await db.collection('articles').findOne({ name });

    if(article){
        res.json(article);
    }else{
        res.send(`That article does not exist`);
    }
});

app.delete('/api/articles/:name',async(req,res) => {
    const { name } = req.params;
    const article = await db.collection('articles').deleteOne({ name });
    if(article){
        res.json(article);
    }else{
        res.send(`That article does not exist`);
    }
});

const PORT = process.env.PORT || 8000;
connectToDb(()=>{
    console.log("Successfully connected to Database");
    app.listen(PORT,() => console.log("I'm alive on port 8000"));    
});