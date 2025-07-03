import React, {useState} from 'react';

type OperationType = 'sum' | 'subtraction' | 'multiplication' | 'division'

export const App: React.FC = () => {


    const [operandA, setOperandA] = useState<string>("");
    const [operandB, setOperandB] = useState<string>("");
    const [operation, setOperation] = useState<string>("sum");
    const [total, setTotal] = useState<string>("");

    const handleOperationSelect = (value: OperationType) => {
        console.log(`operation: ${value}`);
        setOperation(value);
    }

    const handleSubmit = (e: any) => {
        const LOWER_LIMIT = -1_000_000;
        const UPPER_LIMIT = 1_000_000;

        e.preventDefault();
        console.log('doing something');
        console.log(`Operation selected: ${operation}`);
        
        if( Number(operandA) < LOWER_LIMIT ) {
            console.log(`Operand A cannot be lower than: ${LOWER_LIMIT}`);
            setTotal("NA");
            return;
        }

        if( Number(operandA) > UPPER_LIMIT ) {
            console.log(`Operand A cannot be higher than: ${LOWER_LIMIT}`);
            setTotal("NA");
            return;
        }

        switch(operation){
            case 'sum':
                console.log(String(Number(operandA) + Number(operandB)));
                setTotal( String(Number(operandA) + Number(operandB)));
            break;
            case 'subtraction':
                console.log(String(Number(operandA) - Number(operandB)));
                setTotal( String(Number(operandA) - Number(operandB)));
            break;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="operandA">Operand A</label>
                <input type="text" placeholder='operand A' name='operandA' value={operandA}
                    onChange={ e => setOperandA(e.target.value)} />

                <select name="operation" id="operation" defaultValue="sum"
                    onChange={ e => handleOperationSelect(e.target.value as OperationType) }>
                    <option value="sum">+</option>
                    <option value="subtraction">-</option>
                    <option value="multiplication">*</option>
                    <option value="division">/</option>
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