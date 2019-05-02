import React from 'react';
import { IoIosAlert } from "react-icons/io";
import './NotFound.css';

const NotFound = () => (
  <div className="not-found">
    <h1>Page Not Found</h1>
    <IoIosAlert style={{height: "200px", width: "200px"}}/>
  </div>
)

export default NotFound;