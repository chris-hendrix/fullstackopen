import loginService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/users';

const GET_USERS = 'GET_USERS';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const SET_USER = 'SET_USER';
const SET_USER_ERROR = 'LOGIN_ERROR';

const initialState = {
  users: [],
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.data };
    case LOGIN_USER:
    case SET_USER:
      return { ...state, user: action.data };
    case LOGOUT_USER:
      return { ...state, user: null };
    case SET_USER_ERROR:
      return { ...state, user: null, error: action.data };
    default:
      return state;
  }
};

export const getUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch({ type: GET_USERS, data: users });
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials);
    window.localStorage.setItem(loginService.localUserKey, JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({ type: LOGIN_USER, data: user });
  } catch (error) {
    dispatch({ type: SET_USER_ERROR, data: 'invalid credentials' });
  }
};

export const logoutUser = () => async (dispatch) => {
  window.localStorage.removeItem(loginService.localUserKey);
  dispatch({ type: LOGOUT_USER });
};

export const setUser = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem(loginService.localUserKey);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    dispatch({ type: SET_USER, data: user });
  } else {
    dispatch({ type: SET_USER_ERROR, data: null });
  }
};

export const setUserError = (error) => (dispatch) => {
  dispatch({ type: SET_USER_ERROR, data: error });
};

export default userReducer;
