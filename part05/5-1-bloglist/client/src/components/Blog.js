import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blog);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleLike = async () => {
    setUpdatedBlog({ ...updatedBlog, likes: updatedBlog.likes + 1 });
    await updateBlog({ ...updatedBlog, likes: updatedBlog.likes + 1 });
  };

  const handleDelete = async () => {
    deleteBlog({ ...updatedBlog });
  };

  const blogDetails = () => (
    <div>
      <p>
        {updatedBlog.url} <br /> likes: {updatedBlog.likes}
      </p>
      <button onClick={handleDelete} type='button'>
        remove
      </button>
    </div>
  );
  return (
    <div style={blogStyle}>
      {updatedBlog.title} by {updatedBlog.author + ' '}
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
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
