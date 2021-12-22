const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;
  expect(blogs[0]._id).toBeDefined();
});

test('successfully create a new blog post', async () => {
  await api.post('/api/blogs').send(helper.listWithOneBlog[0]).expect(201);
  const response = await api.get('/api/blogs');
  expect(response.body.length).toBe(helper.blogs.length + 1);
});

test('default value of the likes property is zero', async () => {
  const blogWithNoLikes = { title: 'No one likes me', author: 'Uncle Scrooge', url: 'nolikes.com' };
  await api.post('/api/blogs').send(blogWithNoLikes).expect(201);
  const blog = await Blog.findOne(blogWithNoLikes);
  expect(blog.likes).toBe(0);
});

test('a blog with no title or url results in status code 400', async () => {
  await api.post('/api/blogs').send({ author: 'Mr Forgetful' }).expect(400);
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    console.log(blogToDelete);

    await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
