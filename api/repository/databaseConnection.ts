import {Sequelize} from "sequelize";
import 'dotenv/config';

const DATABASE_NAME = process.env.DATABASE_NAME || '';
const DATABASE_USER = process.env.DATABASE_USER || '';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';

export class DatabaseConnection {
    
    private static instance: Sequelize;

    static getInstance(): Sequelize {
        if(!DatabaseConnection.instance){
            this.instance = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
                host: 'localhost',
                port: 3306,
                dialect: 'mariadb',
                dialectOptions: {
                    allowPublicKeyRetrieval: true
                }
            });
        }
        return this.instance;
    }
    
}


