import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (e) => {
    e.preventDefault();
    if (e.target.value === '') return;
    dispatch(createAnecdote(e.target.content.value));
    e.target.content.value = '';
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
