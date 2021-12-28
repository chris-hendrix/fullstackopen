import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ANECDOTES': {
      return action.data;
    }
    case 'VOTE_FOR_ANECDOTE': {
      const changedAnecdote = action.data;
      return state.map((a) => (a.id === changedAnecdote.id ? changedAnecdote : a));
    }
    case 'CREATE_ANECDOTE': {
      const anecdote = action.data;
      return state.concat(anecdote);
    }
    default:
      return state;
  }
};

export const getAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: 'GET_ANECDOTES', data: anecdotes });
  };
};

export const voteForAnecdote = ({ id, content, likes }) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.update(id, {
      content,
      likes: likes ? likes + 1 : 1,
    });
    dispatch({ type: 'VOTE_FOR_ANECDOTE', data: savedAnecdote });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({ type: 'CREATE_ANECDOTE', data: savedAnecdote });
  };
};

export default anecdoteReducer;
