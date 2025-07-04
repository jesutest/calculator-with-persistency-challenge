import { DataTypes} from 'sequelize';
import { DatabaseConnection } from '../repository/databaseConnection';
const databaseConnection = DatabaseConnection.getInstance();

export const Operation = databaseConnection.define(
    'Operation',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
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
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'operations'
    }
)