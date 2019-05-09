import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import Register from '../authentication/Register';
import About from './About';

class Landing extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="hero center-content white-text title">
          <h1>Home Sweet Home</h1>
          <Register />
        </Jumbotron>
        <About />
      </div>
    );
  }
}

export default Landing;
