import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

// layouts
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// routes
import Landing from './components/page/Landing';
import About from './components/page/About';
import Housing from './components/page/Housing';
import Profile from './components/page/Profile';
import NotFound from './components/page/NotFound';

import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import PrivateRoute from './components/authentication/PrivateRoute'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isGoogleLogin: null
    }
  }
  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        clientId: '471876448199-rbr3jioupfcqkgvgisrbflvgb5q1q7ns.apps.googleusercontent.com'
      })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          const googleUserInfo = this.auth.currentUser.get().getBasicProfile() || null;
          this.setState({
            isGoogleLogin: this.auth.isSignedIn.get(),
            user: googleUserInfo
          })
          this.auth.isSignedIn.listen(this.onAuthChange);
          // console.log(this.auth.isSignedIn.get())
          // console.log(this.auth.currentUser.get().getBasicProfile())
        })
    });
  }  
  onAuthChange = () => {
    this.setState({
      isGoogleLogin: this.auth.isSignedIn.get()
    })
  }
  googleSignIn = () => {
    this.auth.signIn()
      .then(() => {
        const googleUserInfo = this.auth.currentUser.get().getBasicProfile();
        this.setState({
          isGoogleLogin: this.auth.isSignedIn.get(),
          user: googleUserInfo
        })
        return <Redirect to="/profile" />
        // console.log(this.auth.currentUser.get().getBasicProfile())
        // const googleUserProfile = this.auth.currentUser.get().getBasicProfile();
        // this.loginUser(googleUserProfile)
      })
      .catch(err => console.log(err))
  }
  componentWillMount = () => {
    fetch('/api/user/isAuthenticate')
    .then(res => res.json())
      .then(res => {
        if(res.isLogin === false) {
          this.setState({
            user: null
          })
        } else {
          this.setState({
            user: res
          })
        }
      })
      .catch(err => console.log(err))
  }
  loginUser = (user) => {
    this.setState({
      user: user
    })
  }
  logoutUser = () => {
    if(this.state.isGoogleLogin) {
      this.auth.signOut()
    } else {
      fetch('api/user/logout')
      .then(res => res.json())
      .then(res => {
        if(res.isLogin === false) {
          this.setState({
            user: null
          })
        }
      })
      .catch(err => console.log(err))
    }
  }
  updateUserProfile = updatedInfo => {
    fetch(`api/user/${this.state.user.uuid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedInfo)
    })
    .then(res => res.json())
    .then(updatedUser => {
      console.log(updatedUser)
      this.setState({
        user: updatedUser
      })
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar 
          isLogin={this.state.user} 
          logoutUser={this.logoutUser}/>
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/about" component={ About } />
            <Route path="/housing" component={ Housing } />
            
            <Route path="/signup" 
            render={(props) => 
            <Signup loginUser={this.loginUser} />} />

            <Route path="/login" 
            render={(props) => 
            <Login loginUser={this.loginUser} 
              googleSignIn={this.googleSignIn}/>} 
            />

            <PrivateRoute path="/profile" component={ Profile } user={this.state.user} updateUserProfile={this.updateUserProfile}/>

            {/* <Route path="/profile" 
            render={(props) => <Profile user={this.state.user} updateUserInfo={this.updateUserInfo}/>} /> */}
            <Route component={ NotFound } />
          </Switch>
        </div>
      </Router> 
      
    );
  }
}

export default App;
