import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getUsers } from '../../actions/users';
import { clearExercise, getExercise, editExercise } from '../../actions/exercises';
import Spinner from '../layout/Spinner';

const EditExercise = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { users, loading } = useSelector(state => state.users);
  const { exercise, ex_loading } = useSelector(state => state.exercises);
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    duration: 0,
    date: '',
  });

  const { username, description, duration, date } = formData;

  useEffect(() => {
    if(loading) {
      dispatch(getUsers());
    }
    dispatch(getExercise(match.params.id));
    return function cleanup() {
      dispatch(clearExercise());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!ex_loading) {
      console.log(exercise);
      setFormData({
        username: exercise.username,
        description: exercise.description,
        duration: exercise.duration,
        date: moment(exercise.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex_loading]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(editExercise(match.params.id, formData, history));
  }

  return ex_loading ? <Spinner /> : (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select name="username" required className="form-control" value={username} onChange={handleChange}>
          {username.length === 0 && <option value={''}>-</option>}
            {users.map((user) => <option key={user._id} value={user.username}>{user.username}</option>)}
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
          <input type="submit" value="Edot Exercise Log" className="btn btn-success" />
        </div>
      </form>
    </div>
  )
}

export default EditExercise
