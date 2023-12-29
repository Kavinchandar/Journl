import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; 
import useUser from '../hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';


function CollapsibleExample() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [ expanded, setExpanded ] = useState(false);
  
  return (
      <Navbar collapseOnSelect expand="lg" fixed='top' expanded={expanded}>
      <Container className='navbarcontainer blur'>
        <Navbar.Brand><Link to='/' className='navbar-logo'><span>Journl</span></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="burger-icon" onClick={()=> setExpanded( expanded ? false: "expanded")}/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Link to="/"className="m-3 link" onClick={()=>setExpanded(false)}>Home</Link>
            <Link to="/articles" className="m-3 link" onClick={()=>setExpanded(false)}>Articles</Link>   
            <Link to="/about" className="m-3 link" onClick={()=>setExpanded(false)}>About</Link>
          </Nav>
          <div className="d-flex justify-content-center align-items-center">
            {user ? <button className="btn btn-outline-danger button-logout" onClick={() => {signOut(getAuth());}}>Log Out</button> : <button className="btn btn-outline-success button-login" onClick={()=> {navigate('/login');}}>Log In</button>}
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;