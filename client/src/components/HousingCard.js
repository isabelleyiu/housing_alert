import React, { Component } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

class HousingCard extends Component {
  render() {
    const {
      Building_Name,
      Building_Street_Address,
      Building_Zip_Code,
      imageURL,
      Tenure,
      unitSummaries,
      Application_Due_Date,
      listingID
    } = this.props.housing;

    const {
      unitType,
      minMonthlyRent,
      maxMonthlyRent,
      minPercentIncome,
      maxPercentIncome,
      minPriceWithParking,
      maxPriceWithParking,
      minPriceWithoutParking,
      maxPriceWithoutParking
    } = unitSummaries.general[0];
    let rent = null;
    let price = null;

    if (Tenure === 'Re-rental') {
      if (minMonthlyRent === null && maxMonthlyRent === null) {
        rent = `${minPercentIncome}% of Income`;
      } else if (minPercentIncome !== maxPercentIncome) {
        rent = `${minPercentIncome}% - ${maxPercentIncome}% of Income`;
      } else if (minMonthlyRent !== maxMonthlyRent) {
        rent = `$${minMonthlyRent} - $${maxMonthlyRent}`;
      } else {
        rent = `$${minMonthlyRent}`;
      }
    }

    if (Tenure === 'Resale') {
      if (minPriceWithParking !== maxPriceWithParking) {
        price = `$${minPriceWithParking} - $${maxPriceWithParking}`;
      } else if (minPriceWithParking) {
        price = `$${minPriceWithParking}`;
      } else if (minPriceWithoutParking !== maxPriceWithoutParking) {
        price = `$${minPriceWithoutParking} - $${maxPriceWithoutParking}`;
      } else {
        price = `$${minPriceWithoutParking}`;
      }
    }

    return (
      <div>
        <Card className="width margin-top-bottom-md">
          <Card.Img variant="top" src={imageURL} style={{ height: '300px' }} />
          <Card.Body style={{ height: '600px' }}>
            <Card.Title>{Building_Name}</Card.Title>
            <Card.Text />
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                Address: {Building_Street_Address}, San Francisco, CA{' '}
                {Building_Zip_Code}
              </ListGroupItem>
              <ListGroupItem>Tenure: {Tenure}</ListGroupItem>
              <ListGroupItem>Unit Type: {unitType}</ListGroupItem>
              <ListGroupItem>
                {rent ? 'Monthly Rent' : 'Price'}: {rent ? rent : price}
              </ListGroupItem>
              <ListGroupItem>
                Application Due:{' '}
                {moment(Application_Due_Date).format('MMMM Do YYYY, h:mm a')}
              </ListGroupItem>
            </ListGroup>
            <Button variant="success">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://housing.sfgov.org/listings/${listingID}`}
                style={{ color: 'inherit', textDecoration: 'none' }}>
                Apply
              </a>
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

HousingCard.propTypes = {
  housing: PropTypes.object
};

export default HousingCard;
