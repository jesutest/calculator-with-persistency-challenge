import { OperationRepository } from "../repository/operationRepository";
import { CalculationType, OperationResponse } from "../types/types";


export class OperationService {
    
    constructor(){}

    public async createOperation ( userId: number, {operandA, operandB, operation}: CalculationType ): Promise<OperationResponse> {
    
        let calculatedValue: number = 0; 
    
        switch(operation) {
            case 'ADDITION':
                calculatedValue = operandA + operandB;
                break;
            case 'SUBTRACTION':
                calculatedValue = operandA - operandB;
                break;
            case 'MULTIPLICATION':
                calculatedValue = operandA * operandB;
                break;
            case 'DIVISION':
                calculatedValue = operandA / operandB;
                break;
            case 'SQUARE_ROOT':
                calculatedValue = Math.sqrt(operandB);
                break;
            // TODO: default
        }

        const operationRepository = new OperationRepository();
        await operationRepository.createOperation(
            10,
            {operandA, operandB, operation}, 
            calculatedValue,  
        );

        return {
            id: "operation-id",
            operation: operation,
            operandA: operandA,
            operandB: operandB,
            result: calculatedValue,
            timestamp: new Date(),
            userId: "user-id"
        }
    }

    public async getOperations ( userId: number): Promise<any> {

        const operationRepository = new OperationRepository();
        const operations = await operationRepository.getOperations(userId);
        console.log(`operations: ${operations}`);

        return operations;
    }

}
