import React, {useState} from 'react';
import axios from 'axios';

type OperationType = 'ADDITION' | 'SUBSTRACTION' | 'MULTIPLICATION' | 'DIVISION' | 'SQUARE_ROOT';

export const CreateOperationForm: React.FC = () => {
    const [operandA, setOperandA] = useState<string>("");
    const [operandB, setOperandB] = useState<string>("");
    const [operation, setOperation] = useState<string>("ADDITION");
    const [total, setTotal] = useState<string>("");

    const API_URL: string = import.meta.env.VITE_REACT_API_URL

    const handleOperationSelect = (value: OperationType) => {
        console.log(`operation: ${value}`);
        setOperation(value);
    }

    const handleSubmit = async (e: any) => {
        const LOWER_LIMIT = -1_000_000;
        const UPPER_LIMIT = 1_000_000;

        e.preventDefault();
        console.log('doing something');
        console.log(`Operation selected: ${operation}`);
        
        if( Number(operandA) < LOWER_LIMIT || Number(operandA) > UPPER_LIMIT
            || Number(operandB) < LOWER_LIMIT || Number(operandB) > UPPER_LIMIT ) {
            console.log(`Operands should be between -1,000,000 and +1,000,000`);
            setTotal("NA");
            return;
        }

        if( operation === 'DIVISION' && Number(operandB) === 0) {
            console.log('Division by zero is not allowed');
            return false;
        }

        if( operation === 'SQUARE_ROOT' && Number(operandB) < 0) {
            console.log('Square root is not allowed for negative numbers');
            return false;
        }

        console.log(`sending data: ${operandA}, ${operandB}, ${operation}`);
        
        const response = await axios.post(
            `${API_URL}/api/calculate`, {
                operandA: operandA,
                operandB: operandB,
                operation: operation
            }
        )

        console.log(`response: ${JSON.stringify(response.data)}`);
    
    }

    return(
        <div className="col-md-4 offset-md-4">
            
            <div className="row mt-4 mb-4 text-center">
                <span>Insert the 2 operands and press Submit to perform the calculation</span>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="operandA" className='form-label'>Operand A</label>
                                <input type="text" className='form-control' name='operandA' value={operandA}
                                    onChange={ e => setOperandA(e.target.value)} />
                            </div>

                            <div className="col-4 mt-4" >
                                
                                <select name="operation" id="operation" className='form-select mt-2'
                                    onChange={ e => handleOperationSelect(e.target.value as OperationType) }>
                                    <option value="ADDITION">+</option>
                                    <option value="SUBSTRACTION">-</option>
                                    <option value="MULTIPLICATION">*</option>
                                    <option value="DIVISION">/</option>
                                    <option value="SQUARE_ROOT">√</option>
                                </select>

                            </div>

                            <div className="col-4">
                                <label htmlFor="operandB" className='form-label'> Operand B</label>
                                <input type="text" name='operandB' value={operandB} className='form-control'
                                    onChange={ e => setOperandB(e.target.value)} />
                            </div>
                        </div>
                        
                        <p className='h4'>Result: {total}</p>
                        
                        <div className="row">
                            <div className="col-4 offset-4">
                                <button className='btn btn-danger'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}