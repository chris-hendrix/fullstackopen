import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import UserBlogTable from './components/UserBlogTable';
import UserView from './components/UserView';

import { setMessage } from './reducers/messageReducer';
import { getBlogs, getUserBlogMap } from './reducers/blogReducer';
import { getUsers, loginUser, logoutUser, setUser } from './reducers/userReducer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

const App = () => {
  const initialCredentials = { username: '', password: '' };
  const [credentials, setCredentials] = useState({ ...initialCredentials });
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const user = useSelector((state) => state.user.user);
  const userBlogMap = useSelector((state) => state.blog.userBlogMap);

  useEffect(() => dispatch(getBlogs()), [dispatch]);
  useEffect(() => dispatch(getUserBlogMap()), [dispatch]);
  useEffect(() => dispatch(getUsers()), [dispatch]);
  useEffect(() => dispatch(setUser()), [dispatch]);

  const displayMessage = (text, type) => {
    dispatch(setMessage({ text, type }));
  };

  const handleInputChange = ({ name, value }) => {
    if (name === 'username') setCredentials({ ...credentials, username: value });
    if (name === 'password') setCredentials({ ...credentials, password: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
        <h2>users</h2>
        <UserBlogTable />
        <h2>blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const match = useRouteMatch('/users/:id');
  const matched = match ? userBlogMap[match.params.id] : null;

  return (
    <div>
      <Switch>
        <Route path='/users/:id'>
          {console.log(matched)}
          {matched && <UserView user={matched.user} blogs={matched.blogs} />}
        </Route>
        <Route path='/users/:id'>
          {console.log(matched)}
          {matched && <UserView user={matched.user} blogs={matched.blogs} />}
        </Route>
        <Route path='/'>
          <Notification />
          {user ? blogList() : loginForm()}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
