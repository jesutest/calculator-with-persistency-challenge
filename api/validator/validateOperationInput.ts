import { OperationType } from "../types/types";

export const validateOperationInput = (operandA: number, operandB: number, operation?: OperationType): boolean => {
    const LOWER_LIMIT = -1_000_000;
    const UPPER_LIMIT = 1_000_000;

    if( operandA < LOWER_LIMIT || operandA > UPPER_LIMIT
        || operandB < LOWER_LIMIT || operandB > UPPER_LIMIT)
    {
        console.log('Operands should be between -1,000,000 and +1,000,000');
        return false;
    }

    // TODO: operandA is ignored for division, make it more intuitive
    if( operation === 'DIVISION' && operandB === 0) {
        console.log('Division by zero is not allowed');
        return false;
    }

    // TODO: operandA is ignored for square root, make it more intuitive
    if( operation === 'SQUARE_ROOT' && operandB < 0) {
        console.log('Square root is not allowed for negative numbers');
        return false;
    }
    
    return true;
}