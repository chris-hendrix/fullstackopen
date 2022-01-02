import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import BlogForm from '../components/BlogForm';
import { act } from 'react-dom/test-utils';

describe('<BlogForm />', () => {
  const testBlog = { title: 'Test Title', author: 'Test Author', url: 'test.com', likes: 2 };

  beforeEach(() => {});

  test('calls the event handler it received as props with the right details when a new blog is created', () => {
    const createBlog = jest.fn();
    const component = render(<BlogForm createBlog={createBlog} />);
    const titleInput = component.container.querySelector('input[name="title"]');
    const authorInput = component.container.querySelector('input[name="author"]');
    const urlInput = component.container.querySelector('input[name="url"]');
    //console.log(prettyDOM(titleInput)); // debug render part of component
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, { target: { value: testBlog.title } });
    fireEvent.change(authorInput, { target: { value: testBlog.author } });
    fireEvent.change(urlInput, { target: { value: testBlog.url } });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(testBlog.title);
    expect(createBlog.mock.calls[0][0].author).toBe(testBlog.author);
    expect(createBlog.mock.calls[0][0].url).toBe(testBlog.url);
  });
});
