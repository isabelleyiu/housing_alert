import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import './App.css';

// layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// routes
import Landing from './components/page/Landing';
import About from './components/page/About';
import Housing from './components/page/Housing';
import Profile from './components/page/Profile';
import NotFound from './components/page/NotFound';

import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import PrivateRoute from './components/authentication/PrivateRoute'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isGoogleLogin: null,
      googleUser: null,
    }
  }
  componentDidMount() {
    this.loadGapiAndAfterwardsInitAuth();
  }
  loadGapiAndAfterwardsInitAuth() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    script.onload = this.initAuth;
    const meta = document.createElement("meta");
    meta.name = "google-signin-client_id";
    meta.content = "471876448199-rbr3jioupfcqkgvgisrbflvgb5q1q7ns.apps.googleusercontent.com";
    document.head.appendChild(meta);
    document.head.appendChild(script);
  }
  initAuth = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        clientId: '471876448199-rbr3jioupfcqkgvgisrbflvgb5q1q7ns.apps.googleusercontent.com'
      })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          const googleUserInfo = this.auth.currentUser.get().getBasicProfile() || null;
          this.setState({
            isGoogleLogin: this.auth.isSignedIn.get(),
            googleUser: googleUserInfo
          })
          this.auth.isSignedIn.listen(this.onAuthChange);
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
        Cookie.set('isAuthenticated', true, { expires: 1 / 2 });
        this.setState({
          isGoogleLogin: this.auth.isSignedIn.get(),
          googleUser: googleUserInfo
        })
      })
      .catch(err => console.log(err))
  }
  loginUser = (user) => {
    this.setState({
      user: user
    })
  }
  logoutUser = () => {
    if (this.state.isGoogleLogin) {
      this.auth.signOut()
      this.setState({
        googleUser: null
      })
    } else {
      fetch('api/auth/')
        .then(res => res.json())
        .then(res => {
          if (res.isLogin === false) {
            this.setState({
              user: null
            })
          }
        })
        .catch(err => console.log(err))
    }
  }
  render() {
    if (this.state.loading) {
      return <h1>...Loading</h1>
    }
    if (this.isGoogleLogin) {
      return <Redirect to="/profile" />
    }
    return (
      <Router>
        <div className="App">
          <Navbar
            isLogin={this.state.user}
            logoutUser={this.logoutUser} />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/about" component={About} />
            <Route path="/housing" component={Housing} />
            <Route path="/register" component={Register} />

            <Route path="/signup"
              render={(props) =>
                <Signup loginUser={this.loginUser} />} />

            <Route path="/login"
              render={(props) =>
                <Login loginUser={this.loginUser}
                  googleSignIn={this.googleSignIn} />}
            />

            <PrivateRoute path="/profile" component={Profile} user={this.state.user} googleUser={this.state.googleUser} updateUserProfile={this.updateUserProfile} logoutUser={this.logoutUser} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
