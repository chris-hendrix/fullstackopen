import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/messageReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    if (content === '') return;
    dispatch(createAnecdote({ content, votes: 0 }));
    dispatch(setMessage(`created '${content}'`));
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
