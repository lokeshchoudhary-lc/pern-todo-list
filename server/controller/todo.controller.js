const createError = require('http-errors');

const db = require('../db/index');

module.exports = {
  showTodos: async (_req, res, next) => {
    try {
      const todos = await db.query('SELECT * FROM todos');
      res.json(todos.rows);
    } catch (err) {
      next(err);
    }
  },
  showSingleTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const todo = await db.query('SELECT * FROM todos WHERE todo_id = $1', [
        id,
      ]);

      res.json(todo.rows[0]);
    } catch (err) {
      next(err);
    }
  },
  createTodo: async (req, res, next) => {
    try {
      const { description } = req.body;

      const newTodo = await db.query(
        'INSERT INTO todos(description) VALUES($1) RETURNING *',
        [description]
      );
      res.json(newTodo.rows[0]);
    } catch (err) {
      next(err);
    }
  },
  updateTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      console.log(id, description);
      await db.query('UPDATE todos SET description = $1 WHERE todo_id = $2', [
        description,
        id,
      ]);

      res.json('Todo was updated!');
    } catch (err) {
      next(err);
    }
  },
  deleteTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM todos WHERE todo_id = $1', [id]);
      res.json('Todo was deleted!');
    } catch (err) {
      next(err);
    }
  },
};
