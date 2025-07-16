import React, {useState} from 'react';
import axios from 'axios';

type OperationType = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION' | 'SQUARE_ROOT';

type CreateOperationFormProps = {
    setOperations: any
}

export const CreateOperationForm: React.FC<CreateOperationFormProps> = (props: CreateOperationFormProps) => {
    const [operandA, setOperandA] = useState<string>("");
    const [operandB, setOperandB] = useState<string>("");
    const [operation, setOperation] = useState<string>("ADDITION");
    const [total, setTotal] = useState<string>("");

    const API_URL: string = import.meta.env.VITE_REACT_API_URL || '';

    const handleOperationSelect = (value: OperationType) => {
        //console.log(`operation: ${value}`);
        setOperation(value);
    }

    const handleSubmit = async (e: any) => {
        const LOWER_LIMIT = -1_000_000;
        const UPPER_LIMIT = 1_000_000;

        e.preventDefault();
        
        
        if( Number(operandA) < LOWER_LIMIT || Number(operandA) > UPPER_LIMIT
            || Number(operandB) < LOWER_LIMIT || Number(operandB) > UPPER_LIMIT ) {
            //console.log(`Operands should be between -1,000,000 and +1,000,000`);
            setTotal("NA");
            return;
        }

        if( operation === 'DIVISION' && Number(operandB) === 0) {
            //console.log('Division by zero is not allowed');
            return false;
        }

        if( operation === 'SQUARE_ROOT' && Number(operandB) < 0) {
            //console.log('Square root is not allowed for negative numbers');
            return false;
        }

        //console.log(`sending data: ${operandA}, ${operandB}, ${operation}`);
        
        // TODO: Put a try/catch block for the entire function
        await axios.post(
            `${API_URL}/api/calculate`, {
                operandA: operandA,
                operandB: operandB,
                operation: operation
            }
        )
            
        const getResponse = await axios.get(`${API_URL}/api/history`);

        props.setOperations( getResponse.data.message );
        
    }

    return(
        <div className="col-md-4 offset-md-4">
            
            <div className="row mt-4 mb-4 text-center">
                <span><b>Insert the 2 operands and press Submit to perform the calculation</b></span>
                <span>Note: For the square root only the Operand B is taken into account</span>
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
                                    <option value="SUBTRACTION">-</option>
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