import {Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import { Link } from 'react-router-dom';
import  Lottie from "lottie-react";
import animationData from "../assets/148994-metaverse.json"


const HomePage = () => {
    return (
        <>
        <Container>
            <Row className='blur rounded-4 mb-5'>
            <Col className='d-flex align-items-center'>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                            <span className='home-text lead m-3'>
                            <p> Welcome to the Penmanship Portal, a vibrant virtual hub designed to ignite your creativity, hone your literary prowess, and connect you with a community of passionate peers who share your love for the written word.</p>
                            </span>
                            <Link to='../articles' className="btn btn-success dive-button mb-3">Create</Link>
                    </div> 
                </Col>
            <Col  className="d-flex justify-content-center align-items-center" lg={6}>
            <Lottie animationData={animationData} />
                </Col>
            
                
            </Row>
        </Container>
        </>
    );
}

export default HomePage;