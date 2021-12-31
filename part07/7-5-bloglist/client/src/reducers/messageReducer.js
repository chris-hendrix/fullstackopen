const SET_MESSAGE = 'SET_MESSAGE';

const messageReducer = (state = '', action) => {
  switch (action.type) {
    case SET_MESSAGE: {
      return action.message;
    }
    default:
      return state;
  }
};

let timeout = null;
export const setMessage =
  (message, seconds = 5) =>
  async (dispatch) => {
    dispatch({ type: SET_MESSAGE, message });
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch({ type: SET_MESSAGE, message: '' });
    }, seconds * 1000);
  };
export default messageReducer;
