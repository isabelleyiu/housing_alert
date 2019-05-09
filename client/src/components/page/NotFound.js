import React from 'react';
import { IoIosAlert } from 'react-icons/io';
import './NotFound.css';
import { bigIcon, center, background } from '../style';

const NotFound = () => (
  <div className="center-content background">
    <h1>Page Not Found</h1>
    <IoIosAlert className="big-icon" />
  </div>
);

export default NotFound;
