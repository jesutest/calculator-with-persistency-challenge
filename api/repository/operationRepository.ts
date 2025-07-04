import { Sequelize } from "sequelize";
import { CalculationType } from "../types/types"
import { Operation } from "../model/Operation";


export const createOperation = async ({operandA, operandB, operation}: CalculationType, calculatedValue: number, databaseConnection: Sequelize) => {

    try{
        const newOperation = await Operation.create( {
            userID: 10,
            operation: operation,
            operandA: operandA,
            operandB: operandB,
            result: calculatedValue,
            createdAt: new Date()
        })

        console.log( `Operation record: ${newOperation}` );
        console.log( "Operation and calculated value persisted in database" );
    }
    catch( e) {
        console.log( `the error: ${e}` );
    }
}