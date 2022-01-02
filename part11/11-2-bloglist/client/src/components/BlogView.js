import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, deleteBlog, addBlogComment } from '../reducers/blogReducer';
import { setMessage } from '../reducers/messageReducer';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

export default function BlogView({ blog }) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
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

  const handleNewCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(addBlogComment({ ...blog }, newComment));
    dispatch(setMessage({ text: `'${newComment}' added as comment`, type: 'success' }));
    setNewComment('');
  };

  const handleInputChange = ({ name, value }) => {
    if (name === 'comment') setNewComment(value);
  };

  const commentForm = () => {
    return (
      <Form onSubmit={handleNewCommentSubmit}>
        <div>
          <input
            id='comment'
            type='text'
            value={newComment}
            name='comment'
            onChange={({ target }) => handleInputChange(target)}
          />
        </div>
        <Button id='submit-blog' type='submit'>
          Add Comment
        </Button>
      </Form>
    );
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
      <p>added by {blog.user ? blog.user.name : 'unknown user'}</p>
      {userMatch() && (
        <Button danger onClick={handleDelete} type='button'>
          remove
        </Button>
      )}
      <h4>comments</h4>
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
      {commentForm()}
    </div>
  );
}
