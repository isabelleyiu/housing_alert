import React, { Component } from "react";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  CardGroup
} from "react-bootstrap";
import moment from "moment";
import PropTypes from "prop-types";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
import "./HousingCard.css";

class HousingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null
    };
  }
  componentDidMount() {
    this.getGeocode();
  }
  getGeocode = async () => {
    const { Building_Street_Address, Building_Zip_Code } = this.props.housing;

    Geocode.setApiKey("AIzaSyCt1a2aohx-NonwFex5Xt5vK9mgOI7t2f4");

    const response = await Geocode.fromAddress(
      `${Building_Street_Address}, San Francisco, CA ${Building_Zip_Code}`
    );

    this.setState({
      lat: response.results[0].geometry.location.lat,
      lng: response.results[0].geometry.location.lng
    });
  };
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

    // render details for different unit types
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

      if (Tenure === "Re-rental") {
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

      if (Tenure === "Resale") {
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
        <div key={i}>
          <ListGroupItem>
            <strong>Unit Type:</strong> {unit.unitType}
          </ListGroupItem>
          <ListGroupItem>
            {rent ? <strong>Monthly Rent</strong> : <strong>Price</strong>}:{" "}
            {rent ? rent : price}
          </ListGroupItem>
        </div>
      );
    });
    return (
      <div>
        <CardGroup className="housing-card margin-top-bottom-md">
          <Card>
            <Card.Img variant="top" src={imageURL} className="card-img" />
            <Card.Body
            // style={{ height: 'auto' }}
            >
              <Card.Title>{Building_Name}</Card.Title>
              <Card.Text />
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <strong>Address:</strong> {Building_Street_Address}, San
                  Francisco, CA {Building_Zip_Code}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Tenure:</strong> {Tenure}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Application Due:</strong>{" "}
                  {moment(Application_Due_Date).format("MMMM Do YYYY, h:mm a")}
                </ListGroupItem>
              </ListGroup>
              <Button variant="success">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://housing.sfgov.org/listings/${listingID}`}
                  className="disable-linkStyle"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Apply
                </a>
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="unit-card">
              <Card.Title>
                {Units_Available === 0
                  ? "Waitlist Open"
                  : `${Units_Available} Unit(s) Available`}
              </Card.Title>
              <ListGroup className="list-group-flush">{units}</ListGroup>
              <div className="map-container">
                <Map
                  className="map"
                  google={this.props.google}
                  center={this.state}
                  zoom={14}
                >
                  <Marker name={Building_Name} position={this.state} />
                </Map>
              </div>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Last Updated at {moment(updatedAt).fromNow()}
              </small>
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyCt1a2aohx-NonwFex5Xt5vK9mgOI7t2f4"
})(HousingCard);
