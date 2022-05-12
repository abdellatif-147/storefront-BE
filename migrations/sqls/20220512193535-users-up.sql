CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(64),
    lastName VARCHAR(64),
    username VARCHAR(100),
    password_digest VARCHAR
);