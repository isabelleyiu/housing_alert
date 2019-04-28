import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './Register.css';

class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      message: '',
      verificationCode: '',
      isVerified: false,
      show: false
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  registerPhone = e => {
    e.preventDefault();
    this.savePhoneNumber(this.state.phone);
    this.sendVerification(this.state.phone);
    this.setState({
      show: true
    })
  }
  savePhoneNumber = (phone) => {
    fetch('api/phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone })
    })
    .then(res => res.json())
    .then(newNumber => {
      this.setState({ 
        message: newNumber.message,
        show: true
      })
    })
    .catch(err => console.log(err))
  }
  sendVerification = (phone) => {
    fetch('api/verification/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone })
    })
    .then(res => res.json())
    // .then(newNumber => {
    //   this.setState({ 
    //     message: newNumber.message,
    //     show: true
    //   })
    // })
    .catch(err => console.log(err))
  }
  verifyPhone = e => {
    e.preventDefault();
    fetch('api/verification/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: this.state.phone,
        verificationCode: this.state.verificationCode,
      })
    })
    .then(res => res.json())
    .then(verification => {
      this.setState({ 
        isVerified: verification.success,
        message: verification.message,
        verificationCode: '',
        phone: '',
        show: false
       })
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="register">
        <Form onSubmit={this.registerPhone} className="registerForm">
          <Form.Label>Register Your Phone Number</Form.Label>
          <Form.Control 
          name="phone" 
          size="sm" 
          type="text" 
          placeholder="Enter Your Phone Number"
          onChange={this.handleChange} />
          
          <Form.Group controlId="formBasicChecbox">
            <Form.Check 
            size="sm" 
            type="checkbox" 
            label="I hereby agree to receive text from Housing Alert" />
          </Form.Group>
          <Button 
          type="submit" 
          variant="outline-primary">Submit</Button>
        </Form>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please Verify Your Number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {this.state.message}
          <Form>
            <Form.Control 
            name="verificationCode" 
            size="sm" 
            type="text" 
            placeholder="Enter Your Verification Code"
            onChange={this.handleChange} />
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={this.verifyPhone}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Register;