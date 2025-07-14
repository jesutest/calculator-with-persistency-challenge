import express, {
    Application, 
    Request, 
    Response
} from 'express';
// @ts-ignore
import cors from 'cors';

import { 
    OperationType, 
    OperationResponse,
    OperationRequest
 } from './types/types';
import { validateOperationInput } from './util/validateOperationInput';
import { OperationService } from './service/operationService';
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


app.get('/api/history', async (req: Request, res: Response) => {
    
    const userId = 10;
    const operationService = new OperationService();
    const operationResponse: OperationResponse = await operationService.getOperations( userId );

    res.send({
        "message": operationResponse
    })
});

app.get('/api/history/{:id}', async (req: Request, res: Response) => {
    
    const userId = 10;
    const operationId = req.params.id;
    const operationService = new OperationService();
    const operationResponse: OperationResponse = await operationService.getOperationById( userId, operationId );

    res.send({
        "message": operationResponse
    })
});

app.post('/api/calculate', async (req: Request, res: Response) => {
    
    const body = req.body as OperationRequest;
    const operandA: number = Number(body.operandA);
    const operandB: number = Number(body.operandB);
    const operation: OperationType = body.operation;

    // Validate operands are in the expected range
    if ( !validateOperationInput(operandA, operandB, operation) ) {
        
        res.status(400)
            .send({
            "message": `Operands should be between -1,000,000 and +1,000,000, divison by zero is not allowed \
                and Square root is not allowed for negative numbers`
        });
        return;
    }

    const userId = 10;
    const operationService = new OperationService();
    const operationResponse: OperationResponse = await operationService.createOperation( userId, { operandA, operandB, operation } );

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