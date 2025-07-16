import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";


export const SignupForm: React.FC = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const API_URL: string = import.meta.env.VITE_REACT_API_URL || '';

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if( username.trim() === '' || email.trim() === '' || 
            password.trim() === '' || confirmPassword.trim() === '') {
                // All the fields are required
            return;
        }
        
        
        // TODO: Put a try/catch block for the entire function
        await axios.post(
            `${API_URL}/api/signup`, {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        )

        navigate('/login');
    }
    
    return(
        <div className="col-md-4 offset-md-4">
            
            <div className="row mt-4 mb-4 text-center">
                <span><b>Signup</b></span>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        <div className="row">
                            <div className="col-6 offset-md-3">
                                <label htmlFor="username" className='form-label'>Username</label>
                                <input type="text" className='form-control' name='username' value={username}
                                    onChange={ e => setUsername(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6 offset-md-3">
                                <label htmlFor="email" className='form-label'> Email</label>
                                <input type="text" name='email' value={email} className='form-control'
                                    onChange={ e => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6 offset-md-3">
                                <label htmlFor="password" className='form-label'> Password</label>
                                <input type="text" name='password' value={password} className='form-control'
                                    onChange={ e => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6 offset-md-3">
                                <label htmlFor="confirmPassword" className='form-label'> Confirm Password</label>
                                <input type="text" name='confirmPassword' value={confirmPassword} className='form-control'
                                    onChange={ e => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>

                        
                        <div className="row mt-4" >
                            <div className="col-4 offset-4 text-center">
                                <button className='btn btn-danger' 
                                    onClick={ () => navigate('/login') }
                                > 
                                    Submit
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}