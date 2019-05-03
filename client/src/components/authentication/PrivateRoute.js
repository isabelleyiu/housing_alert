import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={ props => {
    return (rest.user? 
      <Component {...props} 
      user={rest.user} 
      updateUserProfile={rest.updateUserProfile}/> 
      : <Redirect to='/login' />)
  }
}
  />
)

export default PrivateRoute;