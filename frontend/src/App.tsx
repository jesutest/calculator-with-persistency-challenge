import axios from 'axios';
import React, {useState} from 'react';

type OperationType = 'ADDITION' | 'SUBSTRACTION' | 'MULTIPLICATION' | 'DIVISION'


const API_URL: string = import.meta.env.VITE_REACT_API_URL

export const App: React.FC = () => {

    const [operandA, setOperandA] = useState<string>("");
    const [operandB, setOperandB] = useState<string>("");
    const [operation, setOperation] = useState<string>("ADDITION");
    const [total, setTotal] = useState<string>("");

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="operandA">Operand A</label>
                <input type="text" placeholder='operand A' name='operandA' value={operandA}
                    onChange={ e => setOperandA(e.target.value)} />

                <select name="operation" id="operation" defaultValue="sum"
                    onChange={ e => handleOperationSelect(e.target.value as OperationType) }>
                    <option value="ADDITION">+</option>
                    <option value="SUBSTRACTION">-</option>
                    <option value="MULTIPLICATION">*</option>
                    <option value="DIVISION">/</option>
                </select>

                <label htmlFor="operandB">Operand B</label>
                <input type="text" placeholder='operand B' name='operandB' value={operandB}
                    onChange={ e => setOperandB(e.target.value)} />
                <h3>Result: {total}</h3>
                <button>Calculate</button>
            </form>
            
        </div>
    )
}