import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/messageReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    if (content === '') return;
    dispatch(createAnecdote(content));
    dispatch(setMessage(`created '${content}'`));
    e.target.content.value = '';
    setTimeout(() => {
      dispatch(setMessage(''));
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
