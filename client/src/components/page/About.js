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
        <h3>Sit back and Relex</h3>
        <h5>Let us do all the hard work for you.</h5>
        <IoIosArrowRoundDown className="small-icon" />
        <div className="margin-top-bottom-md">
          <IoIosPhonePortrait className="big-icon" />
          <span>
            <strong>Step 1: </strong> Enter your phone number above to register
            with Housing Alert.
          </span>
        </div>
        <div>
          <IoIosColorWand className="big-icon" />
          <span>
            <strong>Step 2: </strong> That's it. You will receive a text message
            from us when there's new affordable housing release
          </span>
        </div>
        <div>
          <IoMdText className="big-icon" />
          <span>
            <strong>Step 3: </strong> Reply to our text message to apply.
          </span>
        </div>
        <div>
          <IoMdPerson className="big-icon" />
          <span>
            <strong>Optional: </strong>Create a profile with us for custom
            experience and one-click apply option
          </span>
        </div>
        <div>
          <IoIosHome className="big-icon" />
          <span>
            <strong>Step 4:</strong> Home Sweet Home
          </span>
        </div>
      </div>
    );
  }
}

export default About;
