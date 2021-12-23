const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { title, url, userId } = request.body;
  if (title === undefined || url === undefined || userId === undefined) {
    response.status(400).json({ error: 'title, url, and userId required' });
  }

  const user = await User.findById(userId);
  const blog = new Blog({ ...request.body, user: user._id });
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, likes },
    { new: true }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
