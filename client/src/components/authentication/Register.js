import React, { Component } from 'react';

class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      message: '',
      verificationCode: '',
      isVerified: false
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
    this.sendVerification(this.state.phone)
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
      this.setState({ message: newNumber.message })
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
    .then(newNumber => {
      this.setState({ message: newNumber.message })
    })
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
        message: verification.message
       })
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="landing">
        <h1>Housing Alert</h1>

        <form onSubmit={this.registerPhone}>
          <input 
          type="text" 
          name="phone"
          placeholder="Enter Your Phone Number" 
          onChange={this.handleChange}></input>
          <button type="submit">Submit</button>
        </form>

        {this.state.message? <p>{this.state.message}</p> : null}

        <form onSubmit={this.verifyPhone}>
          <input 
          type="text" 
          name="verificationCode"
          placeholder="Enter Your Verification Code" 
          onChange={this.handleChange}></input>
          <button type="submit">Submit</button>
        </form>

      </div>
    )
  }
}

export default Register;