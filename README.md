# calculator-with-persistency-challenge

# Setup MySQL database

#### NOTE: You'll get a warning saying that the engine version from the database is no longer supported, however the docker image is the latest available. This need to be address later to verify what's wrong on Sequelize, it might that the driver is the official from MariaDB.

To do so, you need docker in your machine. 

Run `docker compose up -d` in your terminal from the root folder of the project. This will create the container, to verify that everything is running well use the following command to get access to mysql via terminal:

`docker exec -it mysql mysql -u root -p`

The above command requires the password specified in MYSQL_ROOT_PASSWORD from the docker-compose.yaml

Verify that the calculator database was created by running `show databases;`

and once the api project is launched you can verify the existence of the tables with `SELECT table_name FROM information_schema.tables where table_schema='calculator';` it should display the `users` and `operations` tables; 

# Setup Express API

Add the values for the env vars in the `.env` file 
`DATABASE_NAME,
DATABASE_USER,
DATABASE_PASSWORD,
`
the values can be found in database.sql, docker-compose.yaml the user is ROOT.

Run the `npm i` from the api folder and then use `npm run start` to launch the api.
Behind that command the `tsc` tool is used, for node it doesn't have something like `ts-node` meaning
that whenever a change is required the `npm run start` command should be run again to reflect the last changes
in contrast with the React app which thanks to Vite all the changes are reflected immediately.


# Setup React app

Add the value for the env var in the `.env` file: 
`VITE_REACT_API_URL` it can be found once the API is run.


Run the `npm i`from the frontend folder and then use `npm run dev`.
That command will start the application which behinds is configured by Vite and Typescript.

Bootstrap CSS is imported to use its CSS clases and the JS interactivity for opening the modal.
It's plain Boostrap, React-Bootstrap or React-style frameworks were not installed to write the react components from scratch.



### Use the API

Operation are inserted by using this endpoint `/api/calculate` with POST

e.g payload
`{
    "operandA": 20,
    "operandB": 4,
    "operation": "ADDITION"
}`

To pull all the operations for a user use this endpoint `/api/history` with GET, 
a harcoded userId is used for that purpose due to the current lack of the auth module: `10`

To pull an specific operation for a user use this endpoint `/api/history/{uuid}` with GET, 
a harcoded userId is used for that purpose due to the current lack of the auth module: `10`




# Current state of the repository

The structure of the api was defined to give it an easy-to-work folder structure. 

It still requires much work and corrections. The frontend requires also more work like adding the `useContext` hook 
that could be used to share the state and methods to reflect the changes between siblings.
That is noticed when a new operation is registered and it is not reflected on the Operations history, a page refresh is required to load
again the changes.

Sequelize is used to manage the database schema by using `{force: true}` which forces the database to accept
the model defined on the api.

Since the auth model is still not created, a `userId` is hardcoded to insert and display the data.

Next steps: 
- Add Postman Collection
- Create endpoint to delete a Operation record and add the logic to the React app
- Add unit tests and start the TDD strategy on both backend and frontend
- Add the auth module on both backend and frontend
- Analyze if a shared module is worth it to not duplicate validation logic on the 2 sides of the system