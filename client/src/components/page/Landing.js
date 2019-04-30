import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap';
import './Landing.css';

import Register from '../components/authentication/Register';
import About from './About';

class Landing extends Component{
  render() {
    return (
      <div>
        <Jumbotron className="hero">
          <h1>Home Sweet Home</h1>
          <Register />
        </Jumbotron>
        <About />
      </div>
    )
  }
}

export default Landing;