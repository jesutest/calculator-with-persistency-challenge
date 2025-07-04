import { OperationRepository } from "../repository/operationRepository";
import { CalculationType, OperationResponse } from "../types/types";


export class OperationService {
    
    private readonly operationRepository: OperationRepository;

    constructor(){
        this.operationRepository = new OperationRepository();
    }

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

        await this.operationRepository.createOperation(
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
;
        console.log(`Pulling operations from database`);
        const operations = await this.operationRepository.getOperations(userId);

        return operations;
    }

    public async getOperationById ( userId: number, operationId: number): Promise<any> {

        console.log(`Pulling operation from database`);
        const operation = await this.operationRepository.getOperationById(userId, operationId);

        return operation;
    }

}
