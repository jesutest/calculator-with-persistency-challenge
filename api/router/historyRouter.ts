import { Router, Request, Response } from "express";
import { OperationService } from "../service/operationService";
import { OperationResponse } from "../types/types";

export const historyRouter = Router();

/**
 * @openapi
 * /api/history/:
 *  get:
 *      tags: 
 *          - History
 *      description: Get the history of operations per user
 *      responses:
 *          200:
 *              description: Returns the operations per user
 */
historyRouter.get('/', async (req: Request, res: Response) => {
    
    const userId = 10;
    const operationService = new OperationService();
    const operationResponse: OperationResponse = await operationService.getOperationsByUserId( userId );

    res.send({
        "message": operationResponse
    })
});

/**
 * @openapi
 * /api/history/{id}:
 *  get:
 *      tags: 
 *          - History
 *      description: Get the details of an operation
 *      parameters:
 *          - name: user id
 *          - in: query    
 *            description: The user id
 *            required: True
 *            schema: 
 *              type: integer
 *              example: 123
 *      responses:
 *          200:
 *              description: Returns the details of an operations
 */
historyRouter.get('/{:id}', async (req: Request, res: Response) => {
    
    const userId = 10;
    const operationId = req.params.id;
    const operationService = new OperationService();
    const operationResponse: OperationResponse = await operationService.getOperationById( userId, operationId );

    res.send({
        "message": operationResponse
    })
});

/**
 * @openapi
 * /api/history/{id}:
 *  delete:
 *      tags: 
 *          - History
 *      description: Delete an operation
 *      parameters:
 *          - name: user id
 *          - in: query
 *            description: The user id
 *            required: True
 *            schema: 
 *              type: number
 *      responses:
 *          200:
 *              description: Returns a message confirming the operation was deleted
 */
historyRouter.delete('/{:id}', async (req: Request, res: Response) => {
    
    const userId = 10;
    const operationId = req.params.id;
    const operationService = new OperationService();
    const operationResponse: OperationResponse = await operationService.deleteOperationById( userId, operationId );

    if( !operationResponse) {
        res.status(500)
            .send({
            "message": `An error ocurred while delete the operation from the database.`
        });
    }

    res.send({
        "message": `Operation has been removed from the database`
    })
});