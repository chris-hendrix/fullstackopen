import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/messageReducer';

const AnecdoteForm = ({ createAnecdote, setMessage }) => {
  const create = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    if (content === '') return;
    createAnecdote({ content, votes: 0 });
    setMessage(`created '${content}'`);
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

const mapDispatchToProps = {
  createAnecdote,
  setMessage,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
