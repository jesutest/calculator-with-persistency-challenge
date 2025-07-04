import React from 'react';
import { Navbar } from './components/Navbar';
import { CreateOperationForm } from './components/CreateOperationForm';
import { ListOperationForm } from './components/ListOperationForm';

export const App: React.FC = () => {

    return (
        <div className='container-fluid'>
            <Navbar/>
            <CreateOperationForm/>
            <ListOperationForm/>
        </div>
    )
}