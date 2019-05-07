import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import './Login.css';
import { IoLogoGoogle } from "react-icons/io";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      message: '',
      redirect: false,
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    fetch('api/auth/', {
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
        if (user.isLogin) {
          this.props.loginUser(user);
          this.setState({
            redirect: true
          })
        } else {
          this.setState({
            message: user.message
          })
        }
      })
      .catch(err => console.log(err))
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/profile" />
    }
    return (
      <div className="login-container">
        <Card>
          <Card.Body>
            <Card.Title>Welcome Back</Card.Title>
            <Form className="login-form" onSubmit={this.handleSubmit} >
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
              {this.state.message ? <p style={{ color: "red" }}>{this.state.message}</p> : null}
              <Button variant="success" type="submit">
                Submit
            </Button>
              <div><Button variant="danger" onClick={this.props.googleSignIn} style={{ width: "94px", marginTop: "20px" }}><IoLogoGoogle />Login</Button></div>
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

