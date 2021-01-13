import axios from 'axios';
import {
  SET_EXERCISES,
  EXERCISE_ERROR,
  REMOVE_EXERCISE,
  CREATE_EXERCISE,
} from './types';
import { setAlert } from './alert';

// Get list of all exercises logged
export const getExercises = () => async dispatch => {
  try {
    const res = await axios.get('/api/exercises');
    dispatch({ type: SET_EXERCISES, payload: res.data });
  } catch (error) {
    dispatch({ type: EXERCISE_ERROR });
    dispatch(setAlert('Could Not Retrieve List of Exercises', 'danger', 5000));
  }
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