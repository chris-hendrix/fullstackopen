const express = require('express');
const { Todo } = require('../mongo');
const redis = require('../redis');
const router = express.Router();

const COUNT_KEY = 'counter';

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* GET todos session count. */
router.get('/count', async (_, res) => {
  const count = await redis.getAsync(COUNT_KEY);
  res.send({ added_todos: count });
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const count = (await redis.getAsync(COUNT_KEY)) || 0;
  console.log(count);
  redis.setAsync(COUNT_KEY, Number(count) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, req.body, { new: true });
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
