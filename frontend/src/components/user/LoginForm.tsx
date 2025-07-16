import { useEffect, useRef, useState } from "react";
import axios from 'axios';


export const LoginForm: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const API_URL: string = import.meta.env.VITE_REACT_API_URL || '';

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if( email.trim() === '' ||  password.trim() === '') {
                // All the fields are required
            return;
        }
        
        
        // TODO: Put a try/catch block for the entire function
        const result = await axios.post(
            `${API_URL}/api/login`, {
                email: email,
                password: password,
            }
        )

        //navigate('/login');
    }
    
    return(
        <div className="col-md-4 offset-md-4">
            
            <div className="row mt-4 mb-4 text-center">
                <span><b>Login</b></span>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} >

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

                        <div className="row mt-4" >
                            <div className="col-4 offset-4 text-center">
                                <button className='btn btn-danger'>Submit</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}