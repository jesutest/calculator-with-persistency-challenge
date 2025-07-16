import { useEffect, useRef, useState } from "react";
import axios from 'axios';


export const LoginForm: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
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