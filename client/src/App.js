import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Navbar />
          <br />
        <div className="container">
          <Alert message="test" type="success" />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/exercise/edit/:id" component={EditExercise} />
          <Route path="/exercise/create" component={CreateExercise} />
          <Route exact path="/users" component={Users} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
