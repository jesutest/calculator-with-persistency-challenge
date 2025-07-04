import { CalculationType } from "../types/types"
import { Operation } from "../model/Operation";


export class OperationRepository {
    
    constructor() {}

    public async createOperation ( userId: number, {operandA, operandB, operation}: CalculationType, calculatedValue: number): Promise<void> {
        try{
            await Operation.create( {
                userId: userId,
                operation: operation,
                operandA: operandA,
                operandB: operandB,
                result: calculatedValue,
                timestamp: new Date()
            })

            console.log( "Operation and calculated value persisted in database" );
        }
        catch( e ) {
            console.log( `Error while inserting operation record: ${e}` );
        }
    }

    public async getOperations (userId: number): Promise<any> {
        try{
            const operations = await Operation.findAll({
                where: {
                    userId: userId
                }
            });

            return operations;
        }
        catch( e ) {
            console.log( `Error while inserting operation record: ${e}` );
        }
    }

    public async getOperationById(userId: number, operationId: number): Promise<any> {
        try{
            const operation = await Operation.findOne({
                where: {
                    userId: userId,
                    id: operationId
                }
            });

            return operation;
        }
        catch( e ) {
            console.log( `Error while inserting operation record: ${e}` );
        }
    }
}