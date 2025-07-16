import { Router, Request, Response } from "express";
import { OperationService } from "../service/operationService";
import { validateOperationInput } from "../validator/validateOperationInput";
import { OperationRequest, OperationType } from "../types/types";

export const calculateRouter = Router();

/**
 * @openapi
 * /api/calculate/:
 *  post:
 *      tags: 
 *          - Calculate
 *      description: Create an operation
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          properties:
 *                              operandA:
 *                                  type: integer
 *                                  example: 10
 *                              operandB:
 *                                  type: integer
 *                                  example: 10
 *                              operation:
 *                                  type: string
 *                                  example: ADDITION, SUBTRACTION, DIVISION, MULTIPLICATION, SQUARE_ROOT
 *      responses:
 *          200:
 *              description: Returns the details of an operations
 */
calculateRouter.post('/', async (req: Request, res: Response) => {
    
    const body = req.body as OperationRequest;
    const operandA: number = Number(body.operandA);
    const operandB: number = Number(body.operandB);
    const operation: OperationType = body.operation;

    // Validate operands are in the expected range
    if ( !validateOperationInput(operandA, operandB, operation) ){
        
        res.status(400)
            .send({
            "message": `Operands should be between -1,000,000 and +1,000,000, divison by zero is not allowed \
                and Square root is not allowed for negative numbers`
        });
    }

    const userId = 10;
    const operationService = new OperationService();
    const operationResponse = await operationService.createOperation( userId, { operandA, operandB, operation } );

    if( !operationResponse) {
        res.status(500)
            .send({
            "message": `An error ocurred while inserting the record into the database.`
        });
    }

    res.send({
        "message": operationResponse
    })
});