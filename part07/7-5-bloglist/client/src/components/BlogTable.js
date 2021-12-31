import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function BlogTable() {
  const blogs = useSelector((state) =>
    [...state.blog.blogs].sort((a, b) => (a.likes > b.likes ? -1 : 1))
  );
  return (
    <div>
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
