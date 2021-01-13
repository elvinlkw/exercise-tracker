import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Spinner from '../layout/Spinner';
import { getUsers } from '../../actions/users';
import { createExercise } from '../../actions/exercises';

const CreateExercise = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.users);
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    duration: 0,
    date: moment().format('YYYY-MM-DD'),
  });

  const { username, description, duration, date } = formData;

  useEffect(() => {
    // Get list of users
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(createExercise(formData, history));
  }

  return loading ? (<Spinner />) :  (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select name="username" required className="form-control" value={username} onChange={handleChange}>
          {username.length === 0 && <option value={''}>-</option>}
            {users.map((user, index) => <option key={index} value={user.username}>{user.username}</option>)}
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input name="description" autoComplete="off" type="text" required className="form-control" value={description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input name="duration" type="text" autoComplete="off" className="form-control" value={duration} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <input type="date" className="form-control" name="date" value={date} onChange={handleChange} />
            {/* <DatePicker selected={date} onChange={handleChange} /> */}
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateExercise;