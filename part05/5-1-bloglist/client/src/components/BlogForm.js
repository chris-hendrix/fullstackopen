import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const initialBlog = { title: '', author: '', url: '' };
  const [newBlog, setNewBlog] = useState({ ...initialBlog });

  const handleInputChange = ({ name, value }) => {
    if (name === 'title') setNewBlog({ ...newBlog, title: value });
    if (name === 'author') setNewBlog({ ...newBlog, author: value });
    if (name === 'url') setNewBlog({ ...newBlog, url: value });
  };

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();
    await createBlog(newBlog);
    setNewBlog({ ...initialBlog });
  };

  return (
    <form onSubmit={handleNewBlogSubmit}>
      <div>
        title:
        <input
          id='title'
          type='text'
          value={newBlog.title}
          name='title'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type='text'
          value={newBlog.author}
          name='author'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          type='text'
          value={newBlog.url}
          name='url'
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <button id='submit-blog' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
