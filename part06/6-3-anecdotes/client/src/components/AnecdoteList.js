import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/messageReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    [...state.anecdotes].sort((a, b) => (a.votes > b.votes ? -1 : 1))
  );
  const dispatch = useDispatch();
  const vote = ({ id, content }) => {
    dispatch(voteForAnecdote(id));
    dispatch(setMessage(`voted for '${content}'`));
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
