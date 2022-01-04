import React from 'react';
import { PropTypes } from 'prop-types';

const UserView = ({ user, blogs }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

UserView.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.object.isRequired,
};

export default UserView;
