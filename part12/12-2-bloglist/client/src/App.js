import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/Notification';
import Users from './components/Users';
import UserView from './components/UserView';
import Blogs from './components/Blogs';
import BlogView from './components/BlogView';
import Navigation from './components/Navigation';

import { getBlogs, getUserBlogMap } from './reducers/blogReducer';
import { getUsers, loginUser, setUser } from './reducers/userReducer';

import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const App = () => {
  const initialCredentials = { username: '', password: '' };
  const [credentials, setCredentials] = useState({ ...initialCredentials });

  const dispatch = useDispatch();
  //const history = useHistory();
  const blogs = useSelector((state) => state.blog.blogs);
  const user = useSelector((state) => state.user.user);

  const userBlogMap = useSelector((state) => state.blog.userBlogMap);

  useEffect(() => dispatch(getBlogs()), [dispatch]);
  useEffect(() => dispatch(getUserBlogMap()), [dispatch]);
  useEffect(() => dispatch(getUsers()), [dispatch]);
  useEffect(() => dispatch(setUser()), [dispatch]);

  const handleInputChange = ({ name, value }) => {
    if (name === 'username') setCredentials({ ...credentials, username: value });
    if (name === 'password') setCredentials({ ...credentials, password: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(credentials));
  };

  const loginForm = () => {
    console.log('render login');
    console.log(user);
    return (
      <Form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            id='username'
            type='text'
            value={credentials.username}
            name='username'
            onChange={({ target }) => handleInputChange(target)}
          />
        </div>
        <div>
          password{' '}
          <input
            id='password'
            type='password'
            value={credentials.password}
            name='password'
            onChange={({ target }) => handleInputChange(target)}
          />
        </div>
        <Button id='login-submit' type='submit'>
          login
        </Button>
      </Form>
    );
  };

  const userRoute = useRouteMatch('/users/:id');
  const matchedUserMap = userRoute ? userBlogMap[userRoute.params.id] : null;
  const blogRoute = useRouteMatch('/blogs/:id');
  const matchedBlog = blogRoute ? blogs.find((blog) => blog._id === blogRoute.params.id) : null;

  return (
    <div className='container'>
      <Notification />
      <Navigation />
      <Switch>
        <Route path='/users/:id'>
          {matchedUserMap && <UserView user={matchedUserMap.user} blogs={matchedUserMap.blogs} />}
        </Route>
        <Route path='/blogs/:id'>{matchedBlog && <BlogView blog={matchedBlog} />}</Route>
        <Route path='/login'>{!user ? loginForm() : <Redirect to='/' />}</Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Blogs />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
