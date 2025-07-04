# calculator-with-persistency-challenge


### Setup MySQL database - The version is 8.4.5 which is the current LTS

To do so, you need docker in your machine. 

Run `docker compose up -d` in your terminal from the root folder of the project. This will create the container, to verify that everything is running well use the following command to get access to mysql via terminal:

`docker exec -it mysql mysql -u root -p`

The above command requires the password specified in MYSQL_ROOT_PASSWORD from the docker-compose.yaml

Verify that the calculator database was created by running `show databases;`

and once the api project is launched you can verify the existence of the tables with `SELECT table_name FROM information_schema.tables where table_schema='calculator';` it should display the `users` and `operations` tables; 




