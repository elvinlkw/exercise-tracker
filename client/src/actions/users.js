import axios from 'axios';
import { GET_USERS, USER_ERROR } from './types';
import { setAlert } from './alert';

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