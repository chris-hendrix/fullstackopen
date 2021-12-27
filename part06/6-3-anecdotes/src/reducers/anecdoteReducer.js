const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ANECDOTES': {
      return action.data;
    }
    case 'VOTE_FOR_ANECDOTE': {
      const id = action.data.id;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((a) => (a.id === id ? changedAnecdote : a));
    }
    case 'CREATE_ANECDOTE': {
      const anecdote = action.data;
      return state.concat(anecdote);
    }
    default:
      return state;
  }
};

export const getAnecdotes = (anecdotes) => {
  return { type: 'GET_ANECDOTES', data: anecdotes };
};

export const voteForAnecdote = (id) => {
  return { type: 'VOTE_FOR_ANECDOTE', data: { id } };
};

export const createAnecdote = (anecdote) => {
  return { type: 'CREATE_ANECDOTE', data: anecdote };
};

export default anecdoteReducer;
