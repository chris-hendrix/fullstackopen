import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

import { setMessage } from './reducers/messageReducer';
import { getBlogs } from './reducers/blogReducer';

const App = () => {
  const initialCredentials = { username: '', password: '' };
  const [credentials, setCredentials] = useState({ ...initialCredentials });
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => dispatch(getBlogs()), [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginService.localUserKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const displayMessage = (text, type) => {
    dispatch(setMessage({ text, type }));
  };

  const handleInputChange = ({ name, value }) => {
    if (name === 'username') setCredentials({ ...credentials, username: value });
    if (name === 'password') setCredentials({ ...credentials, password: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = credentials;
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(loginService.localUserKey, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      displayMessage('Successful login', 'success');
    } catch (exception) {
      displayMessage('Wrong credentials', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(loginService.localUserKey);
    displayMessage('Successful logout', 'success');
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={credentials.username}
          name='username'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        password
        <input
          id='password'
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
      <BlogForm />
    </Togglable>
  );

  const blogList = () => {
    const sortedBlogs = [...blogs].sort((a, b) => (a.likes > b.likes ? -1 : 1));
    return (
      <div className='blogList'>
        <p>{user.name} is logged in</p>
        <button onClick={handleLogout} type='button'>
          Logout
        </button>
        <h2>create new</h2>
        <div>{blogForm()}</div>
        <h2>blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification />
      {user ? blogList() : loginForm()}
    </div>
  );
};

export default App;
