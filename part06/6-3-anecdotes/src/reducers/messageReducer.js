const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      return action.message;
    }
    default:
      return state;
  }
};

let timeout = null;
export const setMessage = (message, seconds = 5) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_MESSAGE', message });
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({ type: 'SET_MESSAGE', message: '' });
    }, seconds * 1000);
  };
};
export default messageReducer;
/*
dispatch(setMessage(`voted for '${anecdote.content}'`));
setTimeout(() => {
  dispatch(setMessage(''));
},
*/
