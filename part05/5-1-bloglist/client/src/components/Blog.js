import React from 'react';
import Togglable from './Togglable';
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogDetails = () => (
    <div>
      <p>
        {blog.url} <br /> likes: {blog.likes}
      </p>
    </div>
  );
  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel='view'>{blogDetails()}</Togglable>
    </div>
  );
};

export default Blog;
