const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  // check for body and title
  const { title, url } = request.body;
  if (title === undefined || url === undefined) {
    response.status(400).json({ error: 'title, url, and userId required' });
  }
  const user = request.user;
  const blog = new Blog({ ...request.body, user: user.id });
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (!blog.user || user.id !== blog.user.toString()) {
    return response.status(401).json({ error: 'unauthorized delete' });
  }
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

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: comment } },
    { new: true }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
