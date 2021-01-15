import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  USER_LOADED,
  LOGOUT
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  token: localStorage.getItem('token')
}

const authReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        loading: false,
        token: payload,
        isAuthenticated: true
      }
    case LOGIN_ERROR:
    case REGISTER_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        token: null,
        user: null,
        isAuthenticated: false
      }
    default:
      return state;
  }
}

export default authReducer;