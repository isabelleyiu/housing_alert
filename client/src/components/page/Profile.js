import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap';

class Profile extends Component{
  render() {
    return (
      <div>
       <Col xs={6} md={4}>
        <Image src="holder.js/171x180" roundedCircle />
       </Col>
       <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>

      </div>
    )
  }
}

export default Profile;