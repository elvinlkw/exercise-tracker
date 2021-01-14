import axios from 'axios';
import { CREATE_USER, DELETE_USER, GET_USERS, USER_ERROR, CHANGE_MODE } from './types';
import { setAlert } from './alert';
import { getExercises } from './exercises';

// Get list of users
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: USER_ERROR })
    dispatch(setAlert('Unable to retrieve list of users', 'danger'));
  }
}

// Create Users
export const createUser = (username) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/users/create', { username }, config);
    dispatch({
      type: CREATE_USER,
      payload: res.data
    });
    dispatch(setAlert('Successfully Added User', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      console.log({error});
    }
  }
}

// Delete Users
export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id
    });
    dispatch(getExercises());
    dispatch(setAlert('Successfully Deleted User', 'success'));
  } catch (error) {
    dispatch(setAlert('Unable to delete user', 'danger'));
  }
}

// Edit Users
export const editUser = (id, username) => async dispatch => {
  try {
    await axios.put(`/api/users/${id}`, { username });
    dispatch(getUsers());
    dispatch(setAlert('Successfully Added User', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      console.log({error});
    }
  }
}

// Toggle Mode between Edit and Create
export const changeMode = (mode, user) => dispatch => {
  dispatch({
    type: CHANGE_MODE,
    payload: { mode, user }
  })
}