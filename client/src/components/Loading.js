import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return <Spinner
    animation="border"
    variant="success"
    role="status"
    style={{ height: "200px", width: "200px" }}>
    <span className="sr-only">Loading...</span>
  </Spinner>
}




export default Loading; 