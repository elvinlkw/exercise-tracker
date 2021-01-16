import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: 'test@test.com',
    password: 'password'
  });
  const [inputType, setType] = useState('password');
  const { email, password } = formData;
  const { loading, isAuthenticated } = auth;
  if(!loading && isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div>
      <h3>Login User</h3>
      <p>Please login to start tracking your exercises</p>
      <form onSubmit={e => {
        e.preventDefault();
        dispatch(loginUser(email, password));
      }}>
        <div className="form-group">
          <label>Email: </label>
          <input type="text" autoComplete="off" required name="email" className="form-control" value={email} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="col-form-label">Password: </label>
          <input type={inputType} autoComplete="off" required name="password" className="form-control" value={password} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="showPassword" onChange={() => inputType === "password" ? setType("text") : setType("password")} />
            <label className="form-check-label" htmlFor="showPassword" style={{userSelect: 'none'}}>Show Password</label>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Login User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default LoginForm;