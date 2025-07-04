import { DataTypes} from 'sequelize';
import { DatabaseConnection } from '../repository/databaseConnection';
const databaseConnection = DatabaseConnection.getInstance();

export const Operation = databaseConnection.define(
    'Operation',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        operation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        operandA: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        operandB: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        result: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'operations'
    }
)