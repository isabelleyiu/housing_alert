import React, { Component } from 'react';
import { Spinner, Button } from 'react-bootstrap';

const Loading = () => (
  <Spinner 
    animation="border" 
    variant="success" 
    role="status" 
    style={{height: "200px", width: "200px"}}>
    <span className="sr-only">Loading...</span>
  </Spinner>

)

export default Loading; 