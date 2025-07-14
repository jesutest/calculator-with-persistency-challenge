import React, {useState} from 'react';
import { Navbar } from './components/Navbar';
import { CreateOperationForm } from './components/CreateOperationForm';
import { ListOperationForm } from './components/ListOperationForm';

export const App: React.FC = () => {

    const [operations, setOperations] = useState<[]>([]);

    return (
        <div className='container-fluid'>
            <Navbar/>
            <CreateOperationForm
                setOperations={setOperations}
            />
            <ListOperationForm 
                operations={operations}
                setOperations={setOperations}
            />
        </div>
    )
}