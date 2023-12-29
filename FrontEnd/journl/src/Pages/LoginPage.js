import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.css';
import './LoginPage.css';

const LoginPage = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async() => {  
        try{
                await signInWithEmailAndPassword(getAuth(), email, password);
                navigate('/articles');
            } catch (e) {
                setError(e.message);
            }
    }

    return  (
        <>
            {error && <p className="error lead text-bg-light">{error}</p>}
            <div className="login-box blur d-flex justify-content-center align-items-center flex-column">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={e => SetEmail(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={e => SetPassword(e.target.value)}/>
                </div>
                <div class="form-group d-flex flex-column">
                    <button className="btn btn-success mb-3" onClick={logIn}>Log In</button>
                    <Link to="/create-account">Don't have an account? Create one here</Link>
                </div>
            </div>
            
        </>
    );
}

export default LoginPage;