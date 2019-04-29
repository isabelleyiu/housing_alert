import React, { Component } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from "prop-types";


class Housing extends Component{
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  
  render() {
    const { Building_Name, Building_Street_Address, Building_Zip_Code, imageURL, Tenure, unitSummaries, Application_Due_Date } = this.props.housing;

    const { unitType, minMonthlyRent } = unitSummaries.general[0];
    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={ imageURL } style={{ height: '300px' }} />
          <Card.Body>
            <Card.Title>{ Building_Name }</Card.Title>
            <Card.Text>
              
            </Card.Text>
            <ListGroup className="list-group-flush">
            <ListGroupItem>Address: { Building_Street_Address }, San Francisco, CA { Building_Zip_Code }</ListGroupItem>
            <ListGroupItem>Tenure: { Tenure }</ListGroupItem>
            <ListGroupItem>Unit Type: { unitType }</ListGroupItem>
            <ListGroupItem>Rent: ${ minMonthlyRent }</ListGroupItem>
            <ListGroupItem>Application Due: { moment(Application_Due_Date).format('MMMM Do YYYY, h:mm a') }</ListGroupItem>
            </ListGroup>
            <Button variant="success">Apply</Button>
          </Card.Body>

        </Card>
      </div>
    )
  }
}

Housing.propTypes = {
  housing: PropTypes.object
}


export default Housing;