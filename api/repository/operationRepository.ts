import { CalculationType } from "../types/types"

export const operationRepository = async ({operandA, operandB, operation}: CalculationType, calculatedValue: number) => {
    console.log("Operation and calculated value persisted in database");
}