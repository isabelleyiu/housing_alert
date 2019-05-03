import React, { Component } from 'react';
import { Form, Card, Image, Col, Button } from 'react-bootstrap';
import './Profile.css';

class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      updatedUser : {},
      isEditing: false,
      message: ''
    };
  }
  // componentDidUpdate() {
  //   if(prevProps.user !== this.props.user) {
      
  //   }
  // }
  editMode = () => {
    this.setState({
      isEditing: true
    })
  }
  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => {
      return {
        updatedUser : {
          ...prevState.updatedUser,
          [name]: value
        }
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
        {/* <Col xs={6} md={4}>
          <Image src="./lego.jpg" roundedCircle />
        </Col> */}
        <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
          <h4><strong>First Name: </strong><span>{this.props.user.firstName}</span></h4>
          <h4><strong>Last Name: </strong><span>{this.props.user.lastName}</span></h4>
          <h4><strong>Date of Birth: </strong><span>{this.props.user.DOB}</span></h4>
          <h4><strong>Household Size: </strong><span>{this.props.user.householdSize}</span></h4>
          <h4><strong>Household Income: </strong><span>{this.props.user.householdIncome}</span></h4>
          <div>
            <Button onClick={this.editMode}>Edit</Button>
            <Button>Delete</Button>
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
          
          <Button onClick={this.handleCancel} type="submit" variant="success">Cancel</Button>
          <Button onClick={this.handleSubmit} type="submit" variant="success">Submit</Button>
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