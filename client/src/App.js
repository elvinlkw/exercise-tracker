import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// File Imports
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import ExercisesList from './components/exercises-list/ExercisesList';
import EditExercise from './components/forms/EditExercise';
import CreateExercise from './components/forms/CreateExercise';
import Users from './components/users/Users';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import PrivateRoute from './components/routing/PrivateRoute';
import Account from './components/account/Account';

import setAuthToken from './utils/setAuthToken';

import "bootstrap/dist/css/bootstrap.min.css";
import { loadUser } from './actions/auth';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
          <Navbar />
          <br />
        <div className="container">
          <Alert message="test" type="success" />
          <Route 
            exact
            path="/"
            render={() => 
              !store.getState().isAuthenticated 
              ? <Redirect to="/login" />
              : <Redirect to="/dashboard" />}
          />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <PrivateRoute path="/dashboard" exact component={ExercisesList} />
          <PrivateRoute exact path="/exercise/:id" component={EditExercise} />
          <PrivateRoute exact path="/exercise" component={CreateExercise} />
          <PrivateRoute path="/me" component={Account} />
          <PrivateRoute exact path="/users" component={Users} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
