import axios from 'axios';
import {
  SET_EXERCISES,
  EXERCISE_ERROR,
  REMOVE_EXERCISE,
  CREATE_EXERCISE,
  SET_EXERCISE,
  CLEAR_EXCERCISE
} from './types';
import { setAlert } from './alert';

// Get list of all exercises logged
export const getExercises = (users_param='') => async dispatch => {
  try {
    let res;
    if(users_param===''){
      res = await axios.get('/api/exercises');
    } else {
      const params = { users: users_param }
      res = await axios.get('/api/exercises', {params});
    }
    dispatch({ type: SET_EXERCISES, payload: res.data });
  } catch (error) {
    dispatch({ type: EXERCISE_ERROR });
    dispatch(setAlert('Could Not Retrieve List of Exercises', 'danger', 5000));
  }
}

// Retrieve specific exercise
export const getExercise = id => async dispatch => {
  try {
    const res = await axios.get(`/api/exercises/${id}`);
    dispatch({
      type: SET_EXERCISE,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert('Could Not Retrieve Exercise', 'danger', 5000));
  }
}

// Clear Exercise
export const clearExercise = () => dispatch => {
  dispatch({ type: CLEAR_EXCERCISE });
}

// Create exercise log
export const createExercise = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/exercises/create', formData, config);

    dispatch({ type: CREATE_EXERCISE, payload: res.data });
    dispatch(setAlert('Successfully Created Log', 'success'));
    history.push('/')
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

// Edit exercise log
export const editExercise = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    await axios.put(`/api/exercises/${id}`, formData, config);

    dispatch(setAlert('Successfully Edited Log', 'success'));
    dispatch(getExercises());
    history.push('/');
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

// Delete exercise log
export const deleteExercise = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/exercises/${id}`);
    dispatch({ type: REMOVE_EXERCISE, payload: id });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (error) {
    dispatch(setAlert('Could Not Remove Exercise', 'danger'));
  }
}