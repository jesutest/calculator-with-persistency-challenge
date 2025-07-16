import express, {
    Application,
} from 'express';
// @ts-ignore
import cors from 'cors';
import {Operation} from './model/Operation';
import {User} from './model/User';
import { DatabaseConnection } from './repository/databaseConnection';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { historyRouter } from './router/historyRouter';
import { calculateRouter } from './router/calculateRouter';

const app: Application = express();
const port = 3000;

app.use(cors({
    origin: true
}));
app.use( express.json() );


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0'
        }
    },
    apis: ['./build/router/*.js'],
}

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec) );

app.use('/api/history', historyRouter );

app.use('/api/calculate', calculateRouter );


app.listen(port, async () => {
    try{
        await DatabaseConnection.getInstance().authenticate();
        console.log('The connection to database was established succesfully');
        
        await User.sync({force: true});
        await Operation.sync({force: true});
        console.log(`Server running on port ${port}`);
    }
    catch( e ){
        console.log(`Error while connecting to database and running server: ${e}`);
    }
})