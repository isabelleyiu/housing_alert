import React, { Component } from 'react';
import { Form, Card, Image, Col, Button } from 'react-bootstrap';
import './Profile.css';
import profilePic from './lego.jpg';

class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      updatedUser: {},
      isEditing: false,
      message: ''
    };
  }
  componentWillMount() {
    this.setState({
      user: this.props.user
    })
  }
  editMode = () => {
    this.setState({
      isEditing: true
    })
  }
  handleChange = e => {
    console.log(e.target.checked)
    const value = e.target.type === 'checkbox' ? (e.target.checked) : e.target.value;
    const name = e.target.name;

    this.setState(prevState => {
      return {
        updatedUser : {
          ...prevState.updatedUser,
          [name]: value
        },
        user : {
          ...prevState.updatedUser,
          [name]: value
        },
      }
    })
  }
  handleCancel = e => {
    this.setState({
      updateUser: {},
      isEditing: false
    })
  }
  handleSubmit = e => {
    e.preventDefault();

    const updatedUser = this.state.updatedUser;
    if(updatedUser.householdIncome) {
      updatedUser.householdIncome = parseInt(updatedUser.householdIncome);
    } else if(updatedUser.householdSize) {
      updatedUser.householdSize = parseInt(updatedUser.householdSize);
    }
    this.props.updateUserProfile(updatedUser);

    this.setState({
      isEditing: false
    })
  }
  renderUserProfile = () => {
    return (
      <div className="user-card-container">
        <Col xs={6} md={4}>
          <Image src={`${profilePic}`} thumbnail width="100px" height="100px" />
        </Col>
        <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
          <h5><strong>First Name: </strong><span>{this.props.user.firstName}</span></h5>
          <h5><strong>Last Name: </strong><span>{this.props.user.lastName}</span></h5>
          <h5><strong>Date of Birth: </strong><span>{this.props.user.DOB}</span></h5>
          <h5><strong>Household Size: </strong><span>{this.props.user.householdSize}</span></h5>
          <h5><strong>Household Income: </strong><span>{this.props.user.householdIncome}</span></h5>

          <div>
            <h5>Looking for:</h5>
            <ul>
              {this.props.user.SRO? <li>SRO</li> : null}
              {this.props.user.studio? <li>Studio</li> : null}
              {this.props.user.oneBedroom? <li>One Bedroom</li> : null}
              {this.props.user.twoBedroom? <li>Two Bedroom</li> : null}
            </ul>
          </div>
          <div className="profile-buttons">
            <Button onClick={this.editMode}>Edit</Button>
            {/* <Button variant="danger" onClick={this.optoutSMS}>Opt-out for SMS</Button>
            <Button variant="danger" onClick={this.deleteProfile}>Delete</Button> */}
          </div>
      </div>
    )
  }
  renderEditForm = () => {
    return (
      <div>
      <Card>
          <Card.Body>
          <Card.Title>What would you need to update?</Card.Title>
        <Form>
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            className="form-input"
            name="firstName" 
            size="sm" 
            type="text" 
            defaultValue={this.props.user.firstName}
            placeholder="Your First Name"
            onChange={this.handleChange} /> 

          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            className="form-input"
            name="lastName" 
            size="sm" 
            type="text" 
            defaultValue={this.props.user.lastName}
            placeholder="Your Last Name"
            onChange={this.handleChange} /> 

          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            className="form-input" 
            name="DOB" 
            size="sm" 
            type="text" 
            defaultValue={this.props.user.DOB}
            placeholder="YYYY-MM-DD"
            onChange={this.handleChange} /> 

          <Form.Label>Household Size</Form.Label>
          <Form.Control
            className="form-input" 
            name="householdSize" 
            size="sm" 
            type="number" 
            defaultValue={this.props.user.householdSize}
            placeholder="How many people will be living in your household?"
            onChange={this.handleChange} /> 

          <Form.Label>Annual Household Income</Form.Label>
          <Form.Control 
            className="form-input"
            name="householdIncome" 
            size="sm" 
            type="text" 
            defaultValue={this.props.user.householdIncome}
            placeholder="This will help us determine your eligibility"
            onChange={this.handleChange} /> 

          <Form.Label className="housing-input">You are looking for: </Form.Label>
          <div className="checkboxes">
            <Form.Group controlId="formBasicChecbox">
              <Form.Check 
              name="SRO"
              type="checkbox" 
              onChange={this.handleChange}
              checked={this.state.user.SRO}
              label="SRO" />
            </Form.Group>

            <Form.Group controlId="formBasicChecbox">
              <Form.Check 
              name="studio"
              type="checkbox" 
              onChange={this.handleChange}
              checked={this.state.user.studio}
              label="Studio" />
            </Form.Group>

            <Form.Group controlId="formBasicChecbox">
              <Form.Check 
              name="oneBedroom"
              type="checkbox" 
              onChange={this.handleChange}
              checked={this.state.user.oneBedroom}
              label="One Bedroom" />
            </Form.Group>

            <Form.Group controlId="formBasicChecbox">
              <Form.Check 
              name="twoBedroom"
              type="checkbox" 
              onChange={this.handleChange}
              checked={this.state.user.twoBedroom}
              label="Two Bedroom" />
            </Form.Group>

          </div>
          <Button onClick={this.handleSubmit} type="submit" variant="success">Submit</Button>
          <Button style={{marginRight: "10px"}} onClick={this.handleCancel} type="submit" variant="success">Cancel</Button>
        </Form>
        </Card.Body>
        </Card>
      </div>
    )
  }
  render() {
    if(this.state.isEditing) {
      return this.renderEditForm() ;
    } 
    return this.renderUserProfile();
  }
}

export default Profile;