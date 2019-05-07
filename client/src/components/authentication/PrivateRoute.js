import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Cookie from 'js-cookie';

// const PrivateRoute = ({ component: Component, ...rest }) => (
// fetch(`api/user/profile`)
//   .then(res => res.json())
//   .then(profile => {
//     if (profile.isLogin) {
//       return <Route {...rest} render={props => {
//         return <Component
//           {...props}
//           user={profile}
//           updateUserProfile={rest.updateUserProfile}
//           get
//           UserProfile={rest.getUserProfile} />
//       }} />
//     }
//     return <Login />
//   }).catch(err => console.log(err))
// )

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    return (Cookie.get('isAuthenticated') ?
      <Component {...props}
        user={rest.user}
        updateUserProfile={rest.updateUserProfile} />
      : <Redirect to='/login' />)
  }
  }
  />
)

export default PrivateRoute;