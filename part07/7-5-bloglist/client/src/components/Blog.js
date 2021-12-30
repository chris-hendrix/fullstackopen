import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogReducer';
import { setMessage } from '../reducers/messageReducer';
import blogService from '../services/blogs';
import loginService from '../services/login';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { setBlogError } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const error = useSelector((state) => state.blog.error);

  const dispatch = useDispatch();

  const handleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
  };

  const handleDelete = () => {
    const user = JSON.parse(window.localStorage.getItem(loginService.localUserKey));
    blogService.setToken(user.token);
    const { title, author } = blog;
    dispatch(deleteBlog({ ...blog }));
    if (error) {
      dispatch(setMessage({ text: error, type: 'error' }));
      dispatch(setBlogError(null));
    } else {
      dispatch(setMessage({ text: `${title} by ${author} successfully deleted`, type: 'success' }));
    }
  };

  const blogDetails = () => (
    <div>
      <p>
        {blog.url} <br /> likes: {blog.likes}
      </p>
      <button onClick={handleDelete} type='button'>
        remove
      </button>
    </div>
  );
  return (
    <div className='blogItem' style={blogStyle}>
      {blog.title} by {blog.author + ' '}
      <button onClick={handleDetails} type='button'>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      <button onClick={handleLike} type='button'>
        like
      </button>
      <div> {detailsVisible && blogDetails()} </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
