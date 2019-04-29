import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import './Login.css';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      message: ''
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    fetch('api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        phone: this.state.phone,
        password: this.state.password
       })
    })
    .then(res => res.json())
    .then(user => {
      console.log(user)
      if(user.isLogin) {
        this.props.loginUser(user);
        // redirect user to Housing
      } else {
        this.setState({
          message: user.message
        })
      }
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="login-container">
        <Card>
          <Card.Body>
          <Card.Title>{this.state.message? this.state.message: 'Welcome Back'}</Card.Title>
          <Form class="login-form" onSubmit={this.handleSubmit} >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control onChange={this.handleChange} name="phone" type="text" placeholder="Enter phone number" />
              <Form.Text className="text-muted">
                We'll never share your personal info with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Password" />
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

Login.propTypes = {
  loginUser: PropTypes.func
}

export default Login;

