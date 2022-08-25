# testPostgreSQLNodeJS

Current build uses .env file to provide information:
PORT
JWT_SECRET
(data related to PostgreSQL)
PGUSER
PGPASSWORD
PGHOST
PGPORT
PGDATABASE

JWT_SECRET was sent to You on email with link on this test.


To build SQL data base was used next code(it is also stored in src/db/database.sql):

CREATE TABLE users (
    id  SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
	last_name VARCHAR(30),
    email VARCHAR(30) UNIQUE,
	phone VARCHAR(30),
    password VARCHAR(60),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
