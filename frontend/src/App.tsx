import React from 'react';
import { Navbar } from './components/Navbar';
import { CreateOperationForm } from './components/CreateOperationForm';


export const App: React.FC = () => {

    return (
        <div className='container-fluid'>
            <Navbar/>
            <CreateOperationForm/>
        </div>
    )
}