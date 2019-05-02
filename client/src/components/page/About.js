import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoIosPhonePortrait, IoMdPerson, IoMdText, IoIosColorWand, IoIosHome } from "react-icons/io";
import './About.css';

class About extends Component{
  render() {
    return (
      <div className="about">
        <h3>Sit back and Relex</h3>
        <h5>Let us do all the hard work for you.</h5>
        <IconContext.Provider className="icon-container" value={{ color: "green", fontSize: "4rem"}}>
          <div style={{marginTop: "40px", marginBottom: "40px"}}>
            <IoIosPhonePortrait style={{height: "150px", width: "150px"}}/>
            <span><strong>Step 1: </strong> Enter your phone number above to register with Housing Alert.</span>
          </div>
          <div>
            <IoIosColorWand style={{height: "150x", width: "150px"}}/>
            <span><strong>Step 2: </strong> That's it. You will receive a text message from us when there's new affordable housing release</span>
          </div>
          <div>
            <IoMdText style={{height: "150px", width: "150px"}}/>
            <span><strong>Step 3: </strong> Reply to our text message to apply.</span>
          </div>
          <div>
            <IoMdPerson style={{height: "150px", width: "150px"}}/>
            <span><strong>Optional: </strong>Create a profile with us for custom experience and one-click apply option</span>
          </div>
          <div>
            <IoIosHome style={{height: "150px", width: "150px"}}/>
            <span><strong>Step 4:</strong> Home Sweet Home</span>
          </div>
        </IconContext.Provider>
        
      </div>
    )
  }
}

export default About;