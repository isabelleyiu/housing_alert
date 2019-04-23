import React, { Component } from 'react';

class Landing extends Component{
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      message: ''
    }
  }
  handleChange = e => {
    this.setState({
      phone: e.target.value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.savePhoneNumber(this.state.phone);
  }
  savePhoneNumber = (phone) => {
    fetch('api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({phone: phone})
    })
    .then(res => res.json())
    .then(newNumber => {
      this.setState({ message: newNumber.message })
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="landing">
        <h1>Housing Alert</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
          placeholder="Enter Your Phone Number" 
          onChange={this.handleChange}></input>
          <button type="submit">Submit</button>
        </form>
        {this.state.message? <p>{this.state.message}</p> : null}
      </div>
    )
  }
}

export default Landing;