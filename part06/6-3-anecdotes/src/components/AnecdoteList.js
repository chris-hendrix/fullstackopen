import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/messageReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    let modified = [...state.anecdotes];
    modified.sort((a, b) => (a.votes > b.votes ? -1 : 1));
    if (state.filter && state.filter !== '') {
      modified = modified.filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    }
    return modified;
  });

  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(setMessage(`voted for '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(setMessage(''));
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
