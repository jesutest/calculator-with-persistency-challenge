import express, {
    Application, 
    Request, 
    Response
} from 'express';
// @ts-ignore
import cors from 'cors';

import { OperationType } from './types/types';
import { isAvalidOperation } from './util/validateInput';
import { calculate } from './service/calculateService';

const app: Application = express();
const port = 3000;

app.use(cors({
    origin: true
}));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    res.send({
        "message": "hello!"
    })
});

app.post('/api/calculate', (req: Request, res: Response) => {
    
    const body = req.body;
    const operandA: number = Number(body.operandA);
    const operandB: number = Number(body.operandB);
    const operation: OperationType = body.operation;

    // Validate operands are in the expected range
    if ( !isAvalidOperation(operandA, operandB, operation) ){
        
        res.status(400)
            .send({
            "message": `Operands should be between -1,000,000 and +1,000,000 and divison by zero is not allowed`
        });
        return;
    }

    // 
    const calculatedValue = calculate(operandA, operandB, operation);
    res.send({
        "message": `operandA: ${operandA}, operandB: ${operandB}, operation: ${operation}, calculatedValue: ${calculatedValue}`
    })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})