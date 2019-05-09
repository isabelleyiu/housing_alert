import React, { Component } from 'react';
import { Form, Card, Image, Col, Button } from 'react-bootstrap';
import { IoIosAddCircleOutline } from 'react-icons/io';
import defaultProfilePic from './defaultProfilePic.jpg';
import Loading from '../Loading';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      updatedUser: {},
      isEditing: false,
      message: '',
      loading: true
    };
  }
  componentWillMount() {
    fetch('api/user/profile')
      .then(res => res.json())
      .then(profile => {
        this.setState({
          user: profile,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }
  editMode = () => {
    this.setState({
      isEditing: true
    });
  };
  handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    this.setState(prevState => {
      return {
        updatedUser: {
          ...prevState.updatedUser,
          [name]: value
        },
        user: {
          ...prevState.updatedUser,
          [name]: value
        }
      };
    });
  };
  handleCancel = e => {
    e.preventDefault();
    this.setState({
      updateUser: {},
      isEditing: false
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const updatedUser = this.state.updatedUser;
    if (updatedUser.householdIncome) {
      updatedUser.householdIncome = parseInt(updatedUser.householdIncome);
    } else if (updatedUser.householdSize) {
      updatedUser.householdSize = parseInt(updatedUser.householdSize);
    }
    this.updateUserProfile(updatedUser);

    this.setState({
      isEditing: false
    });
  };
  updateUserProfile = updatedInfo => {
    fetch('api/user/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedInfo)
    })
      .then(res => res.json())
      .then(updatedUser => {
        this.setState({
          user: updatedUser
        });
      })
      .catch(err => console.log(err));
  };
  deleteUserProfile = () => {
    this.props.logoutUser();
    fetch('api/user/profile', {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(deletedUser => {
        this.setState({
          user: null,
          message: deletedUser.message
        });
      })
      .catch(err => console.log(err));
  };
  toggleSMS = e => {
    e.preventDefault();
    fetch(`api/phone/sms`)
      .then(res => res.json())
      .then(res => {
        this.setState(prevState => {
          return {
            message: res.message,
            user: {
              ...prevState.user,
              phone: { ...prevState.user.phone, isVerified: res.isVerified }
            }
          };
        });
      })
      .catch(err => console.log(err));
  };
  renderUserProfile = () => {
    return (
      <div className="background  padding-top-bottom-md">
        <div className="center-content">
          <Col xs={6} md={4}>
            <Image
              src={`${defaultProfilePic}`}
              roundedCircle
              width="200px"
              height="200px"
            />
          </Col>
          <h1>
            {this.state.user.firstName} {this.state.user.lastName}
          </h1>
          <h5>
            <strong>First Name: </strong>
            <span>{this.state.user.firstName}</span>
          </h5>
          <h5>
            <strong>Last Name: </strong>
            <span>{this.state.user.lastName}</span>
          </h5>
          <h5>
            <strong>Date of Birth: </strong>
            <span>{this.state.user.DOB}</span>
          </h5>
          <h5>
            <strong>Household Size: </strong>
            <span>{this.state.user.householdSize}</span>
          </h5>
          <h5>
            <strong>Household Income: </strong>
            <span>{this.state.user.householdIncome}</span>
          </h5>

          <div>
            <h5>Looking for:</h5>
            <div>
              {this.state.user.SRO ? (
                <p className="disable-listStyle">
                  <IoIosAddCircleOutline /> SRO
                </p>
              ) : null}
              {this.state.user.studio ? (
                <p className="disable-listStyle">
                  <IoIosAddCircleOutline /> Studio
                </p>
              ) : null}
              {this.state.user.oneBedroom ? (
                <p className="disable-listStyle">
                  <IoIosAddCircleOutline /> One Bedroom
                </p>
              ) : null}
              {this.state.user.twoBedroom ? (
                <p className="disable-listStyle">
                  <IoIosAddCircleOutline /> Two Bedroom
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <Button onClick={this.editMode} className="margin-right-xs">
            Edit
          </Button>
          <Button variant="danger" onClick={this.deleteUserProfile}>
            Delete
          </Button>
        </div>
      </div>
    );
  };
  renderEditForm = () => {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>What would you like to update?</Card.Title>
            <Form>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="firstName"
                size="sm"
                type="text"
                defaultValue={this.state.user.firstName}
                placeholder="Your First Name"
                onChange={this.handleChange}
              />

              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="lastName"
                size="sm"
                type="text"
                defaultValue={this.state.user.lastName}
                placeholder="Your Last Name"
                onChange={this.handleChange}
              />

              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="DOB"
                size="sm"
                type="text"
                defaultValue={this.state.user.DOB}
                placeholder="YYYY-MM-DD"
                onChange={this.handleChange}
              />

              <Form.Label>Household Size</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="householdSize"
                size="sm"
                type="number"
                defaultValue={this.state.user.householdSize}
                placeholder="How many people will be living in your household?"
                onChange={this.handleChange}
              />

              <Form.Label>Annual Household Income</Form.Label>
              <Form.Control
                className="margin-bottom-sm"
                name="householdIncome"
                size="sm"
                type="text"
                defaultValue={this.state.user.householdIncome}
                placeholder="This will help us determine your eligibility"
                onChange={this.handleChange}
              />

              <Form.Label className="housing-input">
                You are looking for:
              </Form.Label>
              <div className="center-content">
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    name="SRO"
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={this.state.user.SRO}
                    label="SRO"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    name="studio"
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={this.state.user.studio}
                    label="Studio"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    name="oneBedroom"
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={this.state.user.oneBedroom}
                    label="One Bedroom"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    name="twoBedroom"
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={this.state.user.twoBedroom}
                    label="Two Bedroom"
                  />
                </Form.Group>
              </div>
              {this.state.message ? (
                <p className="error">{this.state.message}</p>
              ) : null}
              <div>
                <Button
                  className="margin-right-xs"
                  onClick={this.handleSubmit}
                  type="submit"
                  variant="success">
                  Submit
                </Button>

                <Button
                  onClick={this.handleCancel}
                  type="submit"
                  variant="success">
                  Cancel
                </Button>
              </div>
              <Button
                onClick={this.toggleSMS}
                type="submit"
                variant="danger"
                style={{ marginTop: '10px', width: '200px' }}>
                {this.state.user.phone.isVerified
                  ? 'OPT-OUT for SMS'
                  : 'OPT-IN for SMS'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  };
  render() {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.isEditing) {
      return this.renderEditForm();
    }
    return this.renderUserProfile();
  }
}

export default Profile;
