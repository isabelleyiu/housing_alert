import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Cookie from 'js-cookie';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    return (Cookie.get('isAuthenticated') ?
      <Component {...props}
        user={rest.user}
        googleUser={rest.googleUser}
        updateUserProfile={rest.updateUserProfile}
        logoutUser={rest.logoutUser}
      />
      : <Redirect to='/login' />)
  }
  }
  />
)

export default PrivateRoute;