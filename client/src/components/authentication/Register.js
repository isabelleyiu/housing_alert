import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      message: '',
      verificationCode: '',
      isChecked: false,
      isVerified: false,
      show: false,
      redirectToSignup: false,
      redirectToProfile: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCheck = e => {
    this.setState(prevState => ({ isChecked: !prevState.isChecked }));
  };
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  registerPhone = e => {
    e.preventDefault();

    const formatNumber = this.state.phone.match(/\d/g).join('');

    fetch('api/phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: formatNumber })
    })
      .then(res => res.json())
      .then(newNumber => {
        if (newNumber.created || newNumber.isVerified === false) {
          this.sendVerification(newNumber.phone);
        } else if (!newNumber.userUUID) {
          this.setState({
            redirectToSignup: true
          });
        } else {
          this.setState({
            redirectToProfile: true
          });
        }
        this.setState({
          message: newNumber.message,
          show: true
        });
      })
      .catch(err => console.log(err));
  };
  sendVerification = phone => {
    fetch('api/verification/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  };
  verifyPhone = e => {
    e.preventDefault();

    const formatNumber = this.state.phone.match(/\d/g).join('');

    fetch('api/verification/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: formatNumber,
        verificationCode: this.state.verificationCode
      })
    })
      .then(res => res.json())
      .then(verification => {
        if (verification.success) {
          this.setState({
            isVerified: verification.success,
            message: verification.message,
            verificationCode: '',
            phone: '',
            show: false,
            redirectToSignup: true
          });
        } else {
          this.setState({
            message: verification.message,
            verificationCode: '',
            phone: ''
          });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.redirectToSignup) {
      return <Redirect to="/signup" />;
    }

    if (this.state.redirectToProfile) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="center-content">
        <Form onSubmit={this.registerPhone} className="registerForm">
          <Form.Label>Your next affordable housing is one text away</Form.Label>
          <Form.Control
            name="phone"
            size="sm"
            type="text"
            placeholder="Enter Your Phone Number"
            onChange={this.handleChange}
          />

          <Form.Group controlId="formBasicChecbox">
            <Form.Check
              name="isChecked"
              className="smallText"
              type="checkbox"
              onChange={this.handleCheck}
              label="I hereby agree to receive text from Housing Alert"
            />
          </Form.Group>
          <Button
            type="submit"
            variant="success"
            disabled={!this.state.isChecked}>
            Submit
          </Button>
        </Form>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
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
                onChange={this.handleChange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit" onClick={this.verifyPhone}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Register;
