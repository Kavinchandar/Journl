
import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContentListPage from './Pages/ContentListPage';
import ContentPage from './Pages/ContentPage';
import NotFoundPage from './Pages/NotFoundPage';
import LoginPage from './Pages/LoginPage';
import CreateAccountPage from './Pages/CreateAccountPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';



function App() {
  return (
    <BrowserRouter>
    <div className="App background">
      <div id='Parent-component'>
        <Container>
            <Row className="mb-5">
              <Col>
                <NavBar/>
              </Col>
            </Row>
            <Row className='body'>
              <Col className='d-flex justify-content-center align-items-center'>
                  <div className='m-4'>
                  <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/articles" element={<ContentListPage/>} />
                    <Route path="/articles/:articleId" element={<ContentPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/create-account" element={<CreateAccountPage/>} />
                    <Route path="*" element={<NotFoundPage/>} />
                  </Routes>
                  </div>
              </Col>
            </Row>
          </Container>
      </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
