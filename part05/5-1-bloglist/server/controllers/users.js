const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

const MIN_PW_LENGTH = 3;

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { content: 1, date: 1 });

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.password || body.password.length < MIN_PW_LENGTH) {
    return response.status(403).json({ error: 'password does not meet requirements' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
