import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './App.css';

// layouts
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// routes
import Login from './components/authentication/Login';
import Landing from './Landing';
import About from './About';
import HousingList from './HousingList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <Route path="/login" component={ Login } />
          <Route path="/about" component={ About } />
          <Route path="/housing" component={ HousingList } />
        </div>
      </Router> 
      
    );
  }
}

export default App;
