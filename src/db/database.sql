CREATE TABLE users (
    id  SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
	last_name VARCHAR(30),
    email VARCHAR(30) UNIQUE,
	phone VARCHAR(30),
    password VARCHAR(60),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);