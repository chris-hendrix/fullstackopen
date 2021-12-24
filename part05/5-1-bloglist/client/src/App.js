import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const localUserKey = 'bloglistUser';
  const initialBlog = { title: '', author: '', url: '' };
  const initialCredentials = { username: '', password: '' };
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [credentials, setCredentials] = useState({ ...initialCredentials });
  const [newBlog, setNewBlog] = useState({ ...initialBlog });
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localUserKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const displayMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleInputChange = ({ name, value }) => {
    switch (name) {
      case 'username':
        setCredentials({ ...credentials, username: value });
        break;
      case 'password':
        setCredentials({ ...credentials, password: value });
        break;
      case 'title':
        setNewBlog({ ...newBlog, title: value });
        break;
      case 'author':
        setNewBlog({ ...newBlog, author: value });
        break;
      case 'url':
        setNewBlog({ ...newBlog, url: value });
        break;
      default:
        break;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = newBlog;
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(localUserKey, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNewBlog({ ...initialBlog });
      displayMessage('Successful login');
    } catch (exception) {
      displayMessage('Wrong credentials');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(localUserKey);
    displayMessage('Successful logout');
  };

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem(localUserKey));
    blogService.setToken(user.token);
    const savedBlog = await blogService.create(newBlog);
    setBlogs([...blogs, savedBlog]);
    setNewBlog({ ...initialBlog });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={credentials.username}
          name='Username'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={credentials.password}
          name='Password'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={handleNewBlogSubmit}>
      <div>
        title:
        <input
          type='text'
          value={newBlog.title}
          name='title'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={newBlog.author}
          name='author'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={newBlog.url}
          name='url'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );

  const blogList = () => (
    <div>
      <h3>{user.name}</h3>
      <button onClick={handleLogout} type='button'>
        Logout
      </button>
      <h2>create new</h2>
      <div>{blogForm()}</div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <Notification message={message} />
      {user ? blogList() : loginForm()}
    </div>
  );
};

export default App;
