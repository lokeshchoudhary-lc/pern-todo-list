CREATE DATABASE todos;

CREATE TABLE todos(
    todo_id Serial Primary Key,
    description varchar ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
