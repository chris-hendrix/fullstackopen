import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const localUserKey = 'bloglistUser';
  const initialCredentials = { username: '', password: '' };
  const initialMessage = { text: null, type: null };
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ ...initialMessage });
  const [credentials, setCredentials] = useState({ ...initialCredentials });
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

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

  const displayMessage = (text, type) => {
    setMessage({ text, type });
    console.log(message);
    setTimeout(() => {
      setMessage({ ...initialMessage });
    }, 5000);
  };

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const user = JSON.parse(window.localStorage.getItem(localUserKey));
    blogService.setToken(user.token);
    const savedBlog = await blogService.create(newBlog);
    const { title, author } = savedBlog;
    displayMessage(`a new blog ${title} by ${author} successfully added`, 'success');
    setBlogs([...blogs, savedBlog]);
  };

  const handleInputChange = ({ name, value }) => {
    switch (name) {
      case 'username':
        setCredentials({ ...credentials, username: value });
        break;
      case 'password':
        setCredentials({ ...credentials, password: value });
        break;
      default:
        break;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = credentials;
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(localUserKey, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      displayMessage('Successful login', 'success');
    } catch (exception) {
      displayMessage('Wrong credentials', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(localUserKey);
    displayMessage('Successful logout', 'success');
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={credentials.username}
          name='username'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={credentials.password}
          name='password'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  const blogList = () => (
    <div>
      <p>{user.name} is logged in</p>
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
      <Notification text={message.text} type={message.type} />
      {user ? blogList() : loginForm()}
    </div>
  );
};

export default App;
