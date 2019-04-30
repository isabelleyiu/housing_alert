import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={ props => {
    console.log(props)
    return (props.user? 
      <Component {...props} /> 
      : <Redirect to='/login' />)
  }
}
  />
)

export default PrivateRoute;