import React, {useState} from 'react';
import { CreateOperationForm } from './CreateOperationForm';
import { ListOperationForm } from './ListOperationForm';

export const Dashboard: React.FC = () => {

    const [operations, setOperations] = useState<[]>([]);

    return (
        <div className='container-fluid'>
            
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