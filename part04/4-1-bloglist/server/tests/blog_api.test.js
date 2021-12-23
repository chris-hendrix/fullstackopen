const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = helper.users.map((user) => new User(user));
  const userPromiseArray = userObjects.map((user) => user.save());
  await Promise.all(userPromiseArray);
  const users = await helper.usersInDb();

  await Blog.deleteMany({});
  const blogObjects = helper.blogs.map((blog) => new Blog({ ...blog, user: users[0] }));
  const blogPromiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(blogPromiseArray);
});

describe('GET USERS', () => {
  test('users returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('CREATE USER', () => {
  test('successfully create a new user', async () => {
    const newUser = {
      username: 'testuser3',
      password: '12345',
      blogs: [],
    };
    await api.post('/api/users').send(newUser).expect(201);
    const response = await api.get('/api/users').expect(200);
    expect(response.body.length).toBe(helper.users.length + 1);
  });
});

describe('GET BLOGS', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('blogs populated with users', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    console.log(blogs);
    expect(blogs[0].user._id).toBeDefined();
  });
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    expect(blogs[0]._id).toBeDefined();
  });
});

describe('DELETE BLOG', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);
  });
});

describe('CREATE BLOGS', () => {
  test('successfully create a new blog post', async () => {
    const users = await helper.usersInDb();
    const blog = { title: 'New blog', url: 'newblog.com', userId: users[0]._id };
    await api.post('/api/blogs').send(blog).expect(201);
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.blogs.length + 1);
  });

  test('successfully create a new blog post with user', async () => {
    const users = await helper.usersInDb();
    const blog = { title: 'Blog with user', url: 'blogwithuser.com', userId: users[0]._id };
    await api.post('/api/blogs').send(blog).expect(201);
    const savedBlog = await Blog.findOne({ title: blog.title, url: blog.url });
    expect(savedBlog.user).toBeDefined();
  });

  test('default value of the likes property is zero', async () => {
    const users = await helper.usersInDb();
    const blog = { title: 'No one likes me', url: 'nolikes.com', userId: users[0]._id };
    await api.post('/api/blogs').send(blog).expect(201);
    const savedBlog = await Blog.findOne({ title: blog.title, url: blog.url });
    expect(savedBlog.likes).toBe(0);
  });

  test('a blog with no title or url results in status code 400', async () => {
    await api.post('/api/blogs').send({ author: 'Mr Forgetful' }).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
