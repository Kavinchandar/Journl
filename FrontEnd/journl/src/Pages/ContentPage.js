import { useState, useEffect } from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../Components/CommentsList';
import "./ContentPage.css"
import AddCommentForm from  '../Components/AddCommentForm';
import useUser from '../hooks/useUser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ContentPage = () => {
    const [ articleInfo, setArticleInfo ] = useState({upvotes: 0, comments: [], canUpvote: false, content: []});
    const { canUpvote } = articleInfo;
    console.log(canUpvote);
    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadArticleInfo = async() => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`,{ headers });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);   
        }

        if(!isLoading) {
            loadArticleInfo();
        }

    },[isLoading, user, articleId]);

    const [clickCount, setClickCount] = useState(0);
    const [buttonText, setButtonText] = useState('Click to Vote');

    const addUpVote = async() => {
        setClickCount(clickCount+1);
        if (clickCount % 2 !== 0) {
            addDownVote();
        }else{
            setButtonText('Downvote');
        }
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null,{ headers });
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    };

    const addDownVote = async() => {
        setButtonText('Upvote');
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/downvote`, null,{ headers });
        const updatedArticle = response.data;
        console.group(updatedArticle.upvotes);
        setArticleInfo(updatedArticle);
    };

    const DeleteArticle = async() => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.delete(`/api/articles/${articleId}`, null,{ headers });
        const updatedArticle = response.data;
        console.log(updatedArticle);
        navigate('/articles');
    };


    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Are you sure you want to delete the article?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-center align-items-center'>
                    <Button onClick={DeleteArticle} className='mr-2 btn btn-danger'>Yes</Button>
                    <Button onClick={props.onHide} className='btn btn-primary'>No</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        );
      }
    
    return (
        <> 
        <div className="Content-box blur rounded-4">
            <div className='Content'>
                <div className="lead d-flex justify-content-between"><h1>{articleInfo.name}</h1><Link to="../articles" className="btn btn-close close-button"></Link></div>
                <div className="d-flex justify-content-between">
                <div className='d-flex'>
                    {user ? 
                        <button onClick={addUpVote} className='btn btn-dark m-3'>{buttonText}</button> : <Link className='btn btn-dark' to="/login">Log in to upvote</Link>}
                    <p className='m-3'>This article has {articleInfo.upvotes} upvote(s)</p>
                </div>
                <div>
                                {user ? <button className= "btn btn-dark" onClick={() => setModalShow(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
                    </button>:""}
                </div>
                </div>
                
                {articleInfo.content.map(paragraph => (
                    <p>{paragraph}</p>
                ))}
                <div className="comment mt-5">
                    {user ? <AddCommentForm articleName={articleId} OnArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}></AddCommentForm> : <Link className='btn btn-dark' to="/login">Log in to comment</Link>}
                    <CommentsList comments={articleInfo.comments}></CommentsList>
                </div>
            </div>
        </div>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        </>
    );
}

export default ContentPage;

