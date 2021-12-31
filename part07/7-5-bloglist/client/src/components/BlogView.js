import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogReducer';
import { setMessage } from '../reducers/messageReducer';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function BlogView({ blog }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  const userMatch = () => {
    if (!user || !blog.user) return false;
    return user.username === blog.user.username;
  };
  const handleLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
  };

  const handleDelete = () => {
    const { title, author } = blog;
    dispatch(deleteBlog({ ...blog }));
    dispatch(setMessage({ text: `${title} by ${author} successfully deleted`, type: 'success' }));
    history.push('/');
  };

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <Button primary onClick={handleLike} type='button'>
          like
        </Button>
      </div>
      <div>added by {blog.user ? blog.user.name : 'unknown user'}</div>
      {userMatch() && (
        <Button danger onClick={handleDelete} type='button'>
          remove
        </Button>
      )}
    </div>
  );
}
