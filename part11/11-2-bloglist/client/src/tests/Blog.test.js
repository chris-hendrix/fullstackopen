import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import Blog from '../components/Blog';

describe('<Blog />', () => {
  const testBlog = { title: 'Test Title', author: 'Test Author', url: 'test.com', likes: 2 };

  beforeEach(() => {});

  test('initially renders title and author, but not url or likes', () => {
    const component = render(<Blog blog={testBlog} updateBlog={jest.fn} deleteBlog={jest.fn} />);
    expect(component.container).toHaveTextContent(testBlog.title);
    expect(component.container).toHaveTextContent(testBlog.author);
    expect(component.container).not.toHaveTextContent(testBlog.url);
    expect(component.container).not.toHaveTextContent(testBlog.likes);
  });

  test('url and number of likes are shown when button clicked', () => {
    const component = render(<Blog blog={testBlog} updateBlog={jest.fn} deleteBlog={jest.fn} />);
    const button = component.getByText('view');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent(testBlog.url);
    expect(component.container).toHaveTextContent(testBlog.likes);
  });

  test('like button functions when clicked', () => {
    const updateBlog = jest.fn();
    const component = render(<Blog blog={testBlog} updateBlog={updateBlog} deleteBlog={jest.fn} />);
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
