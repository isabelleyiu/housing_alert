require('dotenv').config();
const db = require("../models");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const authy = require('authy')(process.env.AUTHY_API_KEY);


const textAllUserPhoneNumber = () => {
  db.User.findAll()
  .then(users => {
    users.forEach(user => {
      const message = client.messages.create({
        body: 'Beep Beep! Housing Alert!',
        from: process.env.TWILIO_PHONE,
        to: `+1${user.phone}`
      })
      .then(message =>  console.log(message.status))
      .done();
    })
    .catch(err => console.log(err))
  });
}

// works here but invalid API key in user-controller
const sendVerification = (req, res) => {
  console.log(req.body.phone)
  authy
    .phones()
    .verification_start(req.body.phone, '1', 'sms', function(err, resp) {
      if (err) {
      res.status(400).json(err);
      }
      res.json(resp.message);
    });
}


const verifyUser = (req, res) => {
  const { phone, verificationCode } = req.body;
  authy.phones()
    .verification_check(phone, '1', verificationCode, function (err, resp) {
      if (err) {
        // invalid token  
      res.status(400).json(err);
      }
      if(resp.success) {
        db.User.update(
          { isVerified: true },
          { where: { phone: req.body.phone }}
        )
        .then(updatedUser => {
          console.log(updatedUser)
        })
        .catch(err => console.log(err))
        // res.status(400).json({ message: err.errors[0].message }
      }
      res.json(resp);
  });
}

module.exports = {
  textAllUserPhoneNumber,
  sendVerification,
  verifyUser,
}