import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

class NavBar extends Component{
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"><FaHome /> Housing Alert</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Nav.Link><Link to="/about">About</Link></Nav.Link>
          <Nav.Link><Link to="/housing">Housing</Link></Nav.Link>
          <Nav.Link><Link to="/profile">Profile</Link></Nav.Link>
          <Nav.Link><Link to="/login">Login</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar;