import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class Login extends Component{
  render() {
    return (
      <div className="login-container">
        <Card>
          <Card.Body>
          <Card.Title>Welcome Back</Card.Title>
          <Form class="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" />
              <Form.Text className="text-muted">
                We'll never share your personal info with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Login;