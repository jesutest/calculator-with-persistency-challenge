import { DatabaseConnection } from "../repository/databaseConnection";
import { createOperation } from "../repository/operationRepository";
import { CalculationType, OperationResponse } from "../types/types";


export const operationService = async ( {operandA, operandB, operation}: CalculationType ): Promise<OperationResponse> => {
    
    let calculatedValue: number = 0; 
    
    switch(operation) {
        case 'ADDITION':
            calculatedValue = operandA + operandB;
        case 'SUBTRACTION':
            calculatedValue = operandA - operandB;
        case 'MULTIPLICATION':
            calculatedValue = operandA * operandB;
        case 'DIVISION':
            calculatedValue = operandA / operandB;
        case 'SQUARE_ROOT':
            calculatedValue = Math.sqrt(operandB);
        // TODO: default
    }

    await createOperation({operandA, operandB, operation}, calculatedValue, DatabaseConnection.getInstance() );

    return {
        id: "operation-id",
        operation: operation,
        operandA: operandA,
        operandB: operandB,
        result: calculatedValue,
        timestamp: new Date(),
        userId: "user-id"
    };
}