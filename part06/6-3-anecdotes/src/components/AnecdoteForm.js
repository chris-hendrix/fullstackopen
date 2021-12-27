import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/messageReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    if (content === '') return;
    const anecdote = await anecdoteService.createNew({ content });
    dispatch(createAnecdote(anecdote));
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
