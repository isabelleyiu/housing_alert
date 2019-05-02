import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
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
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="./homeSweetHome.jpeg" />
          <Card.Body>
            <Card.Title>{this.props.user.firstName} {this.props.user.lastName}</Card.Title>
            {/* <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text> */}
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
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Profile;