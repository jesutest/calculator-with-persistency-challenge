import { OperationType } from "../types/types";

export const calculate = (operandA: number, operandB: number, operation: OperationType): number => {

    switch(operation) {
        case 'ADDITION':
            return operandA + operandB;
        case 'SUBTRACTION':
            return operandA - operandB;
        case 'MULTIPLICATION':
            return operandA * operandB;
        case 'DIVISION':
            return operandA / operandB;
    }
}