import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <NavLink exact to="/" className="navbar-brand"><i className="fas fa-dumbbell mr-2" />ExcerciseTracker</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <NavLink exact to="/" className="nav-link">Exercises</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/exercise/create" className="nav-link">Create Exercise Log</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/user/create" className="nav-link">Create User</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;