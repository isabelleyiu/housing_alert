import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => (
  <Spinner animation="border" variant="success" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>

)

export default Loading; 