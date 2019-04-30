import React, { Component } from 'react';
import { FaSms } from "react-icons/fa";
import { IconContext } from "react-icons";
import './About.css';

class About extends Component{
  render() {
    return (
      <div className="about">
        <h3>Sit back and Relex</h3>
        <h5>Let us do all the hard work for you.</h5>
        <IconContext.Provider value={{ color: "green", fontSize: "4rem", className: "global-class-name" }}>
          <div>
            <FaSms style={{height: "200px", width: "200px"}}/>
          </div>
        </IconContext.Provider>
        
      </div>
    )
  }
}

export default About;