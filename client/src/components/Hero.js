import React, { Component } from 'react';
import Register from './authentication/Register';
import { Jumbotron } from 'react-bootstrap';
import './Hero.css';

class Hero extends Component{
  render() {
    return (
      <Jumbotron className="hero">
        <h1>Home Sweet Home</h1>
        <Register />
      </Jumbotron>
    )
  }
}

export default Hero;