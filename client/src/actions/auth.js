import axios from 'axios';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  USER_LOADED,
  LOGOUT
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR });
  }
}

// Login User
export const loginUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const formData = { email, password };
    const res = await axios.post('/api/auth/login', formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_ERROR });
  }
}

// Register User
export const registerUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const formData = { email, password };
  
  try {
    const res = await axios.post('api/auth/', formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Successfully Registered User', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_ERROR
    });
  }
}

// Change Password
export const updatePassword = ( curr_password, password, setFormData ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  const formData = {
    old_password: curr_password,
    new_password: password
  }

  try {
    await axios.post('/api/auth/change-password', formData, config);
    dispatch(setAlert('Password Updated', 'success'));
    setFormData({
      curr_password: '',
      password: '',
      password2: ''
    })
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

// Delete Account
export const deleteAccount = id => async dispatch => {
  try {
    await axios.delete(`/api/auth/${id}`);
    dispatch(setAlert('Successfully deleted User', 'success'));
    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, 'danger'));
  }
}

// Logout User
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert('Successfully Logged Out', 'success'));
};