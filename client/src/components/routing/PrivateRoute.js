import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth);
  const { loading, isAuthenticated } = auth;
  return (
    <Route 
      {...rest} 
      render={props => 
        (!isAuthenticated && !loading) ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        ) 
      }
    />
  )
}

export default PrivateRoute;