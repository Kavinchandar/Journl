
import ListComponent from '../Components/ListComponent';
import './ContentListPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';
import { Link } from 'react-router-dom';


const ContentListPage = () => {
    const [ articleInfo, setArticleInfo ] = useState({upvotes: 0, comments: [], canUpvote: false, content: []});
    const [show, setShow] = useState(false);
    const [Title, SetTitle] = useState('');
    const [Content, SetContent] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { user } = useUser();
    
    useEffect(() => {
        const loadArticleInfo = async() => {
            const response = await axios.get(`/api/articles`);
            setArticleInfo(response.data);
        }
        loadArticleInfo();
    },[articleInfo]);


    const addData = async() => {
        if(Title && Content){
        const response = await axios.post(`/api/articles/${Title}`, {
            content: Content.split("\n"),
        },);
        console.log(response);
        SetTitle('');
        SetContent('');
        }
        handleClose();
      };

    return (
        <>
        <div className="add-new-button-container d-flex justify-content-end  align-items-end">{user ? <button className='btn btn-outline-light add-new-button' onClick={handleShow}>+</button> : <Link className='btn btn-dark mb-5' to="/login">LogIn to add new article</Link>}</div>
        <ListComponent articles = {articleInfo}></ListComponent>
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-xl"
            aria-labelledby="example-custom-modal-styling-title"
            size='lg'
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Write your own Article!
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="A Midsummer Night's Dream"
                    autoFocus
                    value={Title}
                    onChange={e => SetTitle(e.target.value)}
                />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Story</Form.Label>
                <Form.Control as="textarea" rows={10} placeholder='Brief as the lightning in the collied night, That, in a spleen, unfolds both heaven and Earth, And, ere a man hath power to say “Behold!”' 
                value={Content}
                onChange={e => SetContent(e.target.value)}/>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success" onClick={addData}>
                Publish
            </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    );
}

export default ContentListPage;