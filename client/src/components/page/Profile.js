import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import './Profile.css';

class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {

      isEditing: false
    };
  }
  
  render() {
    return (
      <div className="user-card-container">
        <Card style={{ width: '40rem', height: '30rem' }}>
          {/* <Card.Img variant="top" src="" /> */}
          <Card.Body>
            <Card.Title>{this.props.user.firstName} {this.props.user.lastName}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush userInfo">
            <ListGroupItem>First Name: 
              <span>{this.props.user.firstName}</span>
            </ListGroupItem>
            <ListGroupItem>Last Name: 
              <span>{this.props.user.lastName}</span>
            </ListGroupItem>
            <ListGroupItem>Date of Birth: 
              <span>{this.props.user.DOB}</span>
            </ListGroupItem>
            <ListGroupItem>Household Size: 
              <span>{this.props.user.householdSize}</span>
            </ListGroupItem>
            <ListGroupItem>Household Income: 
              <span>{this.props.user.householdIncome}</span>
            </ListGroupItem>
            {/* <input type="checkbox">SRO</input> */}
          </ListGroup>
          <Card.Body>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Profile;