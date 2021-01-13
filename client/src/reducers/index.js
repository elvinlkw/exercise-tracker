import { combineReducers } from 'redux';
// Reducer Imports
import alert from './alert';
import exercises from './exercises';
import users from './users';

export default combineReducers({
  alert,
  exercises,
  users,
});