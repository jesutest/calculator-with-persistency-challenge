import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import { 
  BrowserRouter, 
  Routes, 
  Route,
  Navigate
} from 'react-router';
import { LoginForm } from './components/user/LoginForm.tsx';
import { SignupForm } from './components/user/SignupForm.tsx';
import { Dashboard } from './components/operation/Dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
            <Navigate replace to="/dashboard" />
          } 
        />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/signup' element={<SignupForm/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>    
  </StrictMode>,
)
