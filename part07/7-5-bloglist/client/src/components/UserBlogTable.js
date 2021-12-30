import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

export default function UserBlogTable() {
  const userBlogMap = useSelector((state) => state.blog.userBlogMap);
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Blogs</th>
        </tr>
        <tbody>
          {Object.entries(userBlogMap).map((entry) => (
            <tr key={entry[0]}>
              {console.log(entry)}
              <td> {entry[1].user.name} </td>
              <td>{entry[1].blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
