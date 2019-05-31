import React, { Component } from 'react';
import {
  IoIosPhonePortrait,
  IoMdPerson,
  IoMdText,
  IoIosColorWand,
  IoIosHome,
  IoIosArrowRoundDown
} from 'react-icons/io';

class About extends Component {
  render() {
    return (
      <div className="background padding-top-bottom-md">
        <h3>Sit back and Relax</h3>
        <h5>Let us do all the hard work for you.</h5>
        <IoIosArrowRoundDown className="small-icon" />
        <div className="margin-top-small">
          <div>
            <IoIosPhonePortrait className="big-icon" />
            <span className="steps-text">
              <strong>Step 1: </strong> Enter your phone number above or text
              "housing alert" to 415-200-2988 to register your number.
            </span>
          </div>
          <div>
            <IoMdPerson className="big-icon" />
            <span className="steps-text">
              <strong>Step 2: </strong>Create a profile with us for custom
              experience
            </span>
          </div>
          <div>
            <IoIosColorWand className="big-icon" />
            <span className="steps-text">
              <strong>Step 3: </strong> That's it. You will receive text message
              from us when there's new affordable housing!
            </span>
          </div>
          <div>
            <IoMdText className="big-icon" />
            <span className="steps-text">
              <strong>Step 4: </strong> Reply to our text message to apply.
            </span>
          </div>
          <div>
            <IoIosHome className="big-icon" />
            <span className="steps-text">
              <strong>Step 4: </strong> Home Sweet Home
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
