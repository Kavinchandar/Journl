import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.css';

const CreateAccountPage = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const CreateAccount = async() => {  
        try{
            if(password !== confirmPassword) {
                setError('Passwords do not match');
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
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
                <div class="form-group">
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Re-enter Password" value={confirmPassword} onChange={e => SetConfirmPassword(e.target.value)}/>
                </div>
                <div class="form-group d-flex flex-column">
                    <button onClick={CreateAccount} className="btn btn-success">Create Account</button>
                    <Link to="/login">Already have an account? Log In!</Link>
                </div>
            </div>
            
        </>
    );
}

export default CreateAccountPage;