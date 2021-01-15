import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, loading } = auth;

  const guestLinks = (
    <Fragment>
      <li className="navbar-item">
        <NavLink exact to="/login" className="nav-link">Login</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/register" className="nav-link">Register</NavLink>
      </li>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <li className="navbar-item">
        <NavLink exact to="/dashboard" className="nav-link">Exercises</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/exercise" className="nav-link">Create Exercise Log</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/users" className="nav-link">Users</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/me" className="nav-link">Account</NavLink>
      </li>
      <li className="navbar-item">
        <a href="true" style={{ cursor: 'pointer' }} onClick={e => {
          e.preventDefault();
          dispatch(logout());
        }} className="nav-link">Logout</a>
      </li>
    </Fragment>
  )

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        {isAuthenticated
        ? <NavLink exact to="/dashboard" className="navbar-brand"><i className="fas fa-dumbbell mr-2" />ExcerciseTracker</NavLink>
        : <NavLink exact to="/login" className="navbar-brand"><i className="fas fa-dumbbell mr-2" />ExcerciseTracker</NavLink>}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {!loading && isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;