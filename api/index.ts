import express, {
    Application, 
    Request, 
    Response
} from 'express';
// @ts-ignore
import cors from 'cors';

import { OperationType, OperationResponse } from './types/types';
import { isAvalidOperation } from './util/validateInput';
import { operationService } from './service/operationService';
import {Operation} from './model/Operation';
import {User} from './model/User';
import { DatabaseConnection } from './repository/databaseConnection';

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

app.post('/api/calculate', async (req: Request, res: Response) => {
    
    const body = req.body;
    const operandA: number = Number(body.operandA);
    const operandB: number = Number(body.operandB);
    const operation: OperationType = body.operation;

    // Validate operands are in the expected range
    if ( !isAvalidOperation(operandA, operandB, operation) ){
        
        res.status(400)
            .send({
            "message": `Operands should be between -1,000,000 and +1,000,000, divison by zero is not allowed \
                and Square root is not allowed for negative numbers`
        });
        return;
    }

    const operationResponse: OperationResponse = await operationService( { operandA, operandB, operation } );

    res.send({
        "message": operationResponse
    })
});

app.listen(port, async () => {
    try{
        await DatabaseConnection.getInstance().authenticate();
        console.log('The connection to database was established succesfully');
        
        await User.sync({force: true});
        await Operation.sync({force: true});
        console.log(`Server running on port ${port}`);
    }
    catch( e ){
        console.log(`Error while connecting to database and running server: ${e}`);
    }
})