import React from 'react';

export default function UserView({ user, blogs }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
