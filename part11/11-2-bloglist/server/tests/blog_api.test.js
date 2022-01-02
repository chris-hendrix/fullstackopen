const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

const getAuthorization = async ({ username, password }) => {
  const login = await api.post('/api/login').send({ username, password });
  return { Authorization: `bearer ${login.body.token}` };
};

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
  test('successfully login and create a new user', async () => {
    const newUser = { ...helper.user };
    await api.post('/api/users').send(newUser).expect(201);
    const response = await api.get('/api/users').expect(200);
    expect(response.body.length).toBe(helper.users.length + 1);
  });
});

describe('GET BLOGS', () => {
  test('blogs are returned as json', async () => {
    const authorization = await getAuthorization(helper.users[0]);
    await api
      .get('/api/blogs')
      .set(authorization)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('blogs populated with users', async () => {
    const authorization = await getAuthorization(helper.users[0]);
    const response = await api.get('/api/blogs').set(authorization);
    const blogs = response.body;
    expect(blogs[0].user._id).toBeDefined();
  });
  test('unique identifier property of the blog posts is named id', async () => {
    const authorization = await getAuthorization(helper.users[0]);
    const response = await api.get('/api/blogs').set(authorization);
    const blogs = response.body;
    expect(blogs[0]._id).toBeDefined();
  });
});

describe('DELETE BLOG', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const authorization = await getAuthorization(helper.users[0]);
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete._id}`).set(authorization).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);
  });
});

describe('CREATE BLOGS', () => {
  test('successfully create a new blog post', async () => {
    const authorization = await getAuthorization(helper.users[0]);
    const blog = { title: 'New blog', url: 'newblog.com' };
    await api.post('/api/blogs').set(authorization).send(blog).expect(201);
    const response = await api.get('/api/blogs').set(authorization);
    expect(response.body.length).toBe(helper.blogs.length + 1);
  });

  test('default value of the likes property is zero', async () => {
    const authorization = await getAuthorization(helper.users[0]);
    const blog = { title: 'No one likes me', url: 'nolikes.com' };
    await api.post('/api/blogs').set(authorization).send(blog).expect(201);
    const savedBlog = await Blog.findOne({ title: blog.title, url: blog.url });
    expect(savedBlog.likes).toBe(0);
  });

  test('a blog with no title or url results in status code 400', async () => {
    const authorization = await getAuthorization(helper.users[0]);
    await api.post('/api/blogs').set(authorization).send({ author: 'Mr Forgetful' }).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
