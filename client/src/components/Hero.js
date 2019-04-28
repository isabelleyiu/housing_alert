import React, { Component } from 'react';
import Register from './authentication/Register';
import { Jumbotron } from 'react-bootstrap';
import './Hero.css';

class Hero extends Component{
  render() {
    return (
      <Jumbotron className="hero">
        <Register />
      </Jumbotron>
    )
  }
}

export default Hero;