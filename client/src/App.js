import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// components
import Landing from './components/layout/Landing';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <Signup />
          <Login />
        </div>
      </Router> 
      
    );
  }
}

export default App;
