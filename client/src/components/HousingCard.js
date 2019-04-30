import React, { Component } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from "prop-types";


class HousingCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  
  render() {
    const { Building_Name, Building_Street_Address, Building_Zip_Code, imageURL, Tenure, unitSummaries, Application_Due_Date } = this.props.housing;

    const { unitType, minMonthlyRent, maxMonthlyRent, minPercentIncome, maxPercentIncome, minPriceWithParking, maxPriceWithParking, minPriceWithoutParking,maxPriceWithoutParking } = unitSummaries.general[0];
    let rent = null;
    let price = null;

    if(Tenure === "Re-rental") {
      if(minMonthlyRent === null && maxMonthlyRent === null){
        rent = `${minPercentIncome}% of Monthly Income`;
      } else if(minPercentIncome !== maxPercentIncome) {
        rent = `${minPercentIncome}% - ${maxPercentIncome}% of Monthly Income`;
      } else if(minMonthlyRent !== maxMonthlyRent) {
        rent = `$${minMonthlyRent} - $${maxMonthlyRent} per month`
      } else {
        rent = `$${minMonthlyRent} per month`;
    }
  }
    
    if(Tenure === "Resale") {
      if(minPriceWithParking !== maxPriceWithParking) {
        price = `$${minPriceWithParking} - $${maxPriceWithParking}`;
      } else if(minPriceWithParking) {
        price = `$${minPriceWithParking}`;
      } else if(minPriceWithoutParking !== maxPriceWithoutParking){
        price = `$${minPriceWithoutParking} - $${maxPriceWithoutParking}`;
      } else {
        price = `$${minPriceWithoutParking}`;
      }
    }
    
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={ imageURL } style={{ height: "300px" }} />
          <Card.Body>
            <Card.Title>{ Building_Name }</Card.Title>
            <Card.Text>
              
            </Card.Text>
            <ListGroup className="list-group-flush">
            <ListGroupItem>Address: { Building_Street_Address }, San Francisco, CA { Building_Zip_Code }</ListGroupItem>
            <ListGroupItem>Tenure: { Tenure }</ListGroupItem>
            <ListGroupItem>Unit Type: { unitType }</ListGroupItem>
            <ListGroupItem>{rent? 'Rent': 'Price'}: {rent? rent: price}</ListGroupItem>
            <ListGroupItem>Application Due: { moment(Application_Due_Date).format('MMMM Do YYYY, h:mm a') }</ListGroupItem>
            </ListGroup>
            <Button variant="success">Apply</Button>
          </Card.Body>

        </Card>
      </div>
    )
  }
}

HousingCard.propTypes = {
  housing: PropTypes.object
}


export default HousingCard;