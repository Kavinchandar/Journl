import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';
import './AddCommentForm.css';
import useUser from '../hooks/useUser';

const AddCommentForm = ({articleName, OnArticleUpdated}) => {
    const [name,setName] = useState('');
    const [commentText, SetCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        }, {headers,
        });
        const updatedArticle = response.data;
        OnArticleUpdated(updatedArticle);
        setName('');
        SetCommentText('');
    }

    return (
        <>  
        <div className="container">
        <div className="row mb-3">
            {user && <p>You are posting as {user.email}</p>}
        </div>
        <div className="row mb-3">
            <div className="col-md-2">
                    <label> Comment: </label>
                </div>
                <div className="col-md-10">
                <textarea value={commentText}
                                onChange={ e => SetCommentText(e.target.value)}
                                type = "textarea"
                                className='textarea'
                                />
            </div>
        </div>
        <div className='row'>
            <div className="col d-flex justify-content-center">
                <button onClick={addComment} className="btn btn-danger">Add a Comment</button>
            </div>
        </div>
        </div>
        </>
    )
}

export default AddCommentForm;