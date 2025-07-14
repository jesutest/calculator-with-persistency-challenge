import { OperationRepository } from "../repository/operationRepository";
import { CalculationType, OperationResponse } from "../types/types";


export class OperationService {
    
    private readonly operationRepository: OperationRepository;

    constructor(){
        this.operationRepository = new OperationRepository();
    }

    public async createOperation ( userId: number, {operandA, operandB, operation}: CalculationType ): Promise<OperationResponse | undefined> {
    
        try {
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

            const result = await this.operationRepository.createOperation(
                Number(userId),
                {operandA, operandB, operation},
                calculatedValue,  
            );

            return {
                id: result.id,
                operation: operation,
                operandA: operandA,
                operandB: operandB,
                result: calculatedValue,
                timestamp: new Date(),
                userId: Number(userId)
            }

        } catch (error) {
            console.log('Exception ocurred: ', error )
            return undefined;
        }
 
    }

    public async getOperationsByUserId ( userId: number): Promise<any> {

        try {
            console.log(`Pulling operations from database`);
            const operations = await this.operationRepository.getOperationsByUserId(userId);    
            return operations;
            
        } catch (error) {
            console.log('Exception ocurred: ', error )
            return undefined;
        }
        
    }

    public async getOperationById ( userId: number, operationId: string): Promise<any> {

        try {
            console.log(`Pulling operation from database`);
            const operation = await this.operationRepository.getOperationById(userId, operationId);
            return operation;   
        } catch (error) {
            console.log('Exception ocurred: ', error )
            return undefined;
        }
    }

}
