import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Cookie from 'js-cookie';
import logo from './logo.png';

const navBarLink = {
  color: 'inherit',
  textDecoration: 'none'
};

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/" style={navBarLink}>
            <FaHome className="logo" />
            Housing Alert
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <Link to="/about" style={navBarLink}>
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/housing" style={navBarLink}>
                Housing
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/profile" style={navBarLink}>
                Profile
              </Link>
            </Nav.Link>
            {Cookie.get('isAuthenticated') ? (
              <Button variant="dark" onClick={this.props.logoutUser}>
                Logout
              </Button>
            ) : (
              <Button variant="dark">
                <Link to="/login" style={navBarLink}>
                  Login
                </Link>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
