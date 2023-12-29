import {Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../Images/utopia.jpg';
import image2 from '../Images/background.jpg';
import './HomePage.css';

const AboutPage = () => {
    return (
        <>
    
        <Container>
            <Row className='blur rounded-4 mb-5'>
            <Col className='d-flex align-items-center'>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                            <span className='home-text lead m-3'>
                            <h1>About Us</h1>
            <p>Welcome to our article website!</p>
            <p>
                We are a dedicated team of writers and enthusiasts passionate about sharing knowledge, insights, and stories with our readers.
                Our goal is to provide informative and engaging articles on a wide range of topics, including technology, science, arts, lifestyle, and more.
            </p>
            <p>
                At our website, you'll find a collection of well-researched and thought-provoking articles crafted by our talented team of writers.
                We strive to deliver content that educates, entertains, and sparks curiosity.
            </p>
                            </span>
                    </div> 
                </Col>
            <Col  className="d-flex justify-content-center align-items-center" lg={6}>
                <img src={image} className='home-image' alt='image1'></img>
            </Col>
            
                
            </Row>
            <Row className='blur rounded-4'>
            <Col  className="d-flex justify-content-center align-items-center" lg={6}>
                <img src={image2} className='home-image' alt='image2'></img>
            </Col>
            <Col className='d-flex align-items-center'>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                            <span className='home-text lead m-3'>
                            <p>
                Whether you're looking for the latest trends in technology, expert advice on personal development, in-depth analyses of cultural phenomena, or simply seeking inspiration, our website has something for everyone.
                We believe in the power of knowledge and the value of diverse perspectives, and we aim to create a platform that fosters learning, creativity, and meaningful discussions.
            </p>
            <p>
                We appreciate your support and engagement with our articles.
                Feel free to explore our website, read our articles, and share your thoughts through comments and social media.
                We hope you find our content inspiring, informative, and enjoyable!
            </p>
            <p>Thank you for being a part of our community.</p>
                            </span>
                    </div> 
                </Col>
                
            </Row>
        </Container>
        </>
    );
}

export default AboutPage;