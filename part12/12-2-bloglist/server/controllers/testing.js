const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.get('/', async (request, response) => {
  response.send('testing server working');
});

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
