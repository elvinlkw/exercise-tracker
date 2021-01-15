import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  });
  const { email, password, password2 } = formData;
  const { loading, isAuthenticated } = auth;
  if(!loading && isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div>
      <h3>Register User</h3>
      <p>You need to have an account to start using our app</p>
      <form onSubmit={e => {
        e.preventDefault();
        if(password !== password2) {
          dispatch(setAlert('Passwords do not match', 'success'));
        } else {
          dispatch(registerUser(email, password));
        }
      }}>
        <div className="form-group">
          <label>Email: </label>
          <input type="text" autoComplete="off" required name="email" className="form-control" value={email} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="col-form-label">Password: </label>
          <input type="password" autoComplete="off" required name="password" className="form-control" value={password} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="col-form-label">Confirm Password: </label>
          <input type="password" autoComplete="off" required name="password2" className="form-control" value={password2} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <input type="submit" value="Register User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default RegisterForm;