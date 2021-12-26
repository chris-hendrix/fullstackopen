import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './reducers/anecdoteReducer';
import messageReducer from './reducers/messageReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: messageReducer,
});
const store = createStore(reducer, composeWithDevTools());

export default store;
