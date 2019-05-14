import React, { Component } from 'react';
import { Card, Button, ListGroup, ListGroupItem, CardGroup } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

class HousingCard extends Component {
  render() {
    const {
      Building_Name,
      Building_Street_Address,
      Building_Zip_Code,
      imageURL,
      Units_Available,
      Tenure,
      unitSummaries,
      Application_Due_Date,
      listingID,
      updatedAt
    } = this.props.housing;

   

    const units = unitSummaries.general.map((unit, i) => {
      const {
        unitType,
        listingID,
        minMonthlyRent,
        maxMonthlyRent,
        minPercentIncome,
        maxPercentIncome,
        minPriceWithParking,
        maxPriceWithParking,
        minPriceWithoutParking,
        maxPriceWithoutParking
      } = unit;
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
        <div key="i">
          <ListGroupItem><strong>Unit Type:</strong> {unit.unitType}</ListGroupItem>
          <ListGroupItem>
            {rent ? <strong>Monthly Rent</strong> : <strong>Price</strong>}: {rent ? rent : price}
          </ListGroupItem>
        </div>
      )
    })
    return (
      <div>
        <CardGroup className="width margin-top-bottom-md">

        <Card>
          <Card.Img variant="top" src={imageURL} style={{ height: '300px' }} />
          <Card.Body style={{ height: '400px' }}>
            <Card.Title>{Building_Name}</Card.Title>
            <Card.Text />
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <strong>Address:</strong> {Building_Street_Address}, San Francisco, CA{' '}
                {Building_Zip_Code}
              </ListGroupItem>
              <ListGroupItem><strong>Tenure:</strong> {Tenure}</ListGroupItem>
              {/* <ListGroupItem><strong>Available Unit:</strong> {Units_Available || 1}</ListGroupItem> */}
              {/* <ListGroupItem>
                {rent ? <strong>Monthly Rent</strong> : <strong>Price</strong>}: {rent ? rent : price}
              </ListGroupItem> */}
              <ListGroupItem>
              <strong>Application Due:</strong>{' '}
                {moment(Application_Due_Date).format('MMMM Do YYYY, h:mm a')}
              </ListGroupItem>
            </ListGroup>
            <Button variant="success">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://housing.sfgov.org/listings/${listingID}`}
                className="disable-linkStyle">
                Apply
              </a>
            </Button>
          </Card.Body>
        </Card>
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
          <Card.Body>
            <Card.Title>{Units_Available || 1} Unit(s) Available</Card.Title>
            <ListGroup className="list-group-flush">
              {units}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last Updated at {moment(updatedAt).fromNow()}</small>
          </Card.Footer>
        </Card>
        </CardGroup>
      </div>
    );
  }
}

HousingCard.propTypes = {
  housing: PropTypes.object
};

export default HousingCard;
