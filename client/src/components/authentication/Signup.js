import React, { Component } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      confirmPassword: '',
      DOB: '',
      firstName: '',
      lastName: '',
      householdSize: 0,
      householdIncome: 0,
      SRO: false,
      studio: false,
      oneBedroom: false,
      twoBedroom: false,
      message: '',
      redirect: false,
      show: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCheck = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };
  signupUser = e => {
    let { message, ...user } = this.state;
    user.phone = user.phone.match(/\d/g).join('');
    e.preventDefault();
    fetch('api/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(newUser => {
        if (newUser.isLogin) {
          this.props.loginUser(newUser);
          // redirect login user to Housing
          this.setState({
            redirect: true
          });
        } else {
          this.setState({
            message: newUser.message
          });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/housing" />;
    }
    return (
      <div className="background padding-all-around">
        <Card>
          <Card.Body>
            <Card.Title className="margin-bottom-md">
              Thank You for Registering with us. Tell us a little more about
              your household
            </Card.Title>
            <Form>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                size="sm"
                name="phone"
                type="text"
                placeholder="Your phone number will be used as your Login ID"
                onChange={this.handleChange}
              />

              <Form.Label>Password</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="password"
                size="sm"
                type="password"
                placeholder="6 to 12 characters with at least 1 lowercase letter, 1 uppercase letter, and 1 numeric value"
                onChange={this.handleChange}
              />

              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="confirmPassword"
                size="sm"
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />

              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="firstName"
                size="sm"
                type="text"
                placeholder="Your First Name"
                onChange={this.handleChange}
              />

              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="lastName"
                size="sm"
                type="text"
                placeholder="Your Last Name"
                onChange={this.handleChange}
              />

              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="DOB"
                size="sm"
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={this.handleChange}
              />

              <Form.Label>Household Size</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="householdSize"
                size="sm"
                type="number"
                placeholder="How many people will be living in your household?"
                onChange={this.handleChange}
              />

              <Form.Label>Annual Household Income</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="householdIncome"
                size="sm"
                type="text"
                placeholder="This will help us determine your eligibility"
                onChange={this.handleChange}
              />

              <Form.Label className="margin-top-small margin-bottom-sm">
                What type of housing are you looking for?
              </Form.Label>
              <div className="center-content  margin-bottom-sm">
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    name="SRO"
                    type="checkbox"
                    onChange={this.handleCheck}
                    label="SRO"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    name="studio"
                    type="checkbox"
                    onChange={this.handleCheck}
                    label="Studio"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    name="oneBedroom"
                    type="checkbox"
                    onChange={this.handleCheck}
                    label="One Bedroom"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    name="twoBedroom"
                    type="checkbox"
                    onChange={this.handleCheck}
                    label="Two Bedroom"
                  />
                </Form.Group>
              </div>

              {this.state.message ? (
                <p className="error">{this.state.message}</p>
              ) : null}
              <Button onClick={this.signupUser} type="submit" variant="success">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Signup;
