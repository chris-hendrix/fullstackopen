import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogReducer';
import messageReducer from './reducers/messageReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  blog: blogReducer,
  message: messageReducer,
  user: userReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
