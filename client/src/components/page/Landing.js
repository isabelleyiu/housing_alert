import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap';
import './Landing.css';

import Register from '../authentication/Register';
import About from './About';
import Footer from '../layout/Footer';

class Landing extends Component{
  render() {
    return (
      <div>
        <Jumbotron className="hero">
          <h1>Home Sweet Home</h1>
          <Register />
        </Jumbotron>
        <About />
        <Footer />
      </div>
    )
  }
}

export default Landing;