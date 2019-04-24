require('dotenv').config();
const db = require("../models");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('../models/node_modules/twilio')(accountSid, authToken);
const authy = require('../models/node_modules/authy')(process.env.AUTHY_API_KEY);


const textAllUserPhoneNumber = () => {
  db.User.findAll()
  .then(users => {
    users.forEach(user => {
      const message = client.messages.create({
        body: 'Thank you for signing up for Housing Alert!',
        from: '+14152002988',
        to: `+1${user.phone}`
      })
      .then(message =>  console.log(message.status))
      .done();
    })
    .catch(err => console.log(err))
  });
}

// works here but invalid API key in user-controller
// authy
//     .phones()
//     .verification_start('5107314004', '1', 'sms', function(err, resp) {
//       if (err) {
//       console.log(err);
//       }
//       console.log(resp);
//     });