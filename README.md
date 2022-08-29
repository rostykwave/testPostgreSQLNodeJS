# testPostgreSQLNodeJS

//npm run dev - to start project with nodemon
//npm start - without nodemon

## .env

Current build uses .env with the variables:

[^1]:
    PORT=3001 - local server's port
    JWT_SECRET - secret word for JSON Web Token

(data related to PostgreSQL)
[^note]: PGUSER="postgres"
[^note]: PGPASSWORD
[^note]: PGHOST='localhost'
[^note]: PGPORT=5432
[^note]: PGDATABASE

## SQL table structure:

CREATE TABLE users (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
email VARCHAR(30) UNIQUE,
phone VARCHAR(30),
password VARCHAR(60),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

PS(it is also stored in src/db/database.sql)

## Socket.io

Current server is using socket.io at http://localhost:3001/
It sends allert and logs information when someone successfully update user info at /users/:id PUT request.

## Routes

Ability to update user info with /users/:id PUT request has only user who provided valid token, associated with this account.

/users/:id GET uses token, but it doesn't nessesary must be related to this request (You can view general info about other users).

/login POST requires valid email and password, it responses with token.

/users POST adds new user with valid information, hashes password, normalizes email to Lower_case and stores in database.
