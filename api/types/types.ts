export type OperationType = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION' | 'SQUARE_ROOT';

export interface CalculationType {
    operandA: number, 
    operandB: number, 
    operation: OperationType
}

export interface OperationRequest {
    operandA: number,
    operandB: number,
    operation: OperationType
}

export interface OperationResponse {
    id: string,
    operation: string,
    operandA: number,
    operandB: number,
    result: number,
    timestamp: Date, // TODO: verify this
    userId: number
}

export interface SignupRequest {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface LoginRequest {
    email: string,
    password: string
}