CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(64),
    lastName VARCHAR(64),
    userName VARCHAR(100),
    password_digest VARCHAR
);