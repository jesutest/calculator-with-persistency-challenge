import { DataTypes} from 'sequelize';
import { DatabaseConnection } from '../repository/databaseConnection';
const databaseConnection = DatabaseConnection.getInstance();


export const User = databaseConnection.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        tableName: 'users'
    }
)