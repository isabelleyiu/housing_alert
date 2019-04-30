import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={ props => {
    console.log(props)
    console.log(rest);
    return (rest.user? 
      <Component {...props} user={rest.user}/> 
      : <Redirect to='/login' />)
  }
}
  />
)

export default PrivateRoute;