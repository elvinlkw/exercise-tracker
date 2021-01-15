import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import { updatePassword } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const EditAccount = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    curr_password: '',
    password: '',
    password2: ''
  });
  const { curr_password, password, password2 } = formData;
  const { user, loading } = auth;

  if(loading) return <Spinner />

  return (
    <form onSubmit={e => {
      e.preventDefault();
      if(password !== password2) {
        dispatch(setAlert('Passwords do not match', 'danger'));
      } else {
        dispatch(updatePassword( curr_password, password, setFormData ));
      }
    }}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Email: </label>
          <input type="text" className="form-control" value={user.email} disabled />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Current Password: </label>
          <input type="password" required name="curr_password" className="form-control" value={curr_password} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Change Password: </label>
          <input type="password" required name="password" className="form-control" value={password} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Confirm Password: </label>
          <input type="password" required name="password2" className="form-control" value={password2} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <input type="submit" value="Change Password" className="btn btn-primary" />
      </div>
    </form>
  )
}

export default EditAccount
