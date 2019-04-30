import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      user: null
    }
  }
  loginUser = (user) => {
    this.setState({
      user
    })
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/about" component={ About } />
            <Route path="/housing" component={ Housing } />
            <Route path="/signup" 
            render={(props) => <Signup loginUser={this.loginUser} />} />
            <Route path="/login" 
            render={(props) => <Login loginUser={this.loginUser} />} />
            {/* user was NOT pass to profile */}
            <PrivateRoute path="/profile" component={ Profile } user={this.state.user} />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </Router> 
      
    );
  }
}

export default App;
