CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
	last_name VARCHAR(30),
    email VARCHAR(30),
	phone VARCHAR(30),
    password VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);