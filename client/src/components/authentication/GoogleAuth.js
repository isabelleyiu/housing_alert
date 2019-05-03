import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ICON_NAME } from "react-icons/io";

class GoogleAuth extends Component {
  render() {
    return (
      <div>
        <Button variant="danger" onClick={this.props.googleSignIn}>Google Login</Button>
      </div>
    )
  }
}

export default GoogleAuth;