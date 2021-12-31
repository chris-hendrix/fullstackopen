import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

export default function Blogs() {
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user.user);
  const blogs = useSelector((state) =>
    [...state.blog.blogs].sort((a, b) => (a.likes > b.likes ? -1 : 1))
  );

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );
  return (
    <div>
      <h2>blogs</h2>
      {user && blogForm()}
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>
                <Link to={`/blogs/${blog._id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
