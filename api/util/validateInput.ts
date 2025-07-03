import { OperationType } from "../types/types";

export const isAvalidOperation = (operandA: number, operandB: number, operation?: OperationType): boolean => {
    const LOWER_LIMIT = -1_000_000;
    const UPPER_LIMIT = 1_000_000;

    if( operandA < LOWER_LIMIT || operandA > UPPER_LIMIT
        || operandB < LOWER_LIMIT || operandB > UPPER_LIMIT)
    {
        console.log('Operands should be between -1,000,000 and +1,000,000');
        return false;
    }

    if( operation === 'DIVISION' && operandB === 0) {
        console.log('Division by zero is not allowed');
        return false;
    }

    // TODO: Validate if is zero
    return true;
}