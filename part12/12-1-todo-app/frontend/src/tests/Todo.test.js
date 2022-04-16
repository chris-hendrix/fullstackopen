import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import List from '../Todos/List';

describe('<TodoList />', () => {
  const todos = [
    { text: 'Test todo rendering', done: false },
    { text: 'Run tests in container', done: false },
  ];

  beforeEach(() => {});

  test('first todo is rendered', () => {
    const component = render(<List todos={todos} deleteTodo={jest.fn} completeTodo={jest.fn} />);
    expect(component.container).toHaveTextContent(todos[0].text);
  });
});
