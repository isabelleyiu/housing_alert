require('dotenv').config();
const db = require('../models');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const authy = require('authy')(process.env.AUTHY_API_KEY);


const textAllPhone = (messageBody) => {
  db.Phone.findAll()
  .then(phones => {
    phones.forEach(phone => {
      if(phone.isVerified) {
        client.messages.create({
          body: messageBody,
          from: process.env.TWILIO_PHONE,
          to: `+1${phone.phone}`
        })
        .then(message =>  console.log(message.status))
        .done();
      }
    })
  }).catch(err => console.log(err))
}

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


const verifyPhone = (req, res) => {
  const { phone, verificationCode } = req.body;
  authy.phones()
    .verification_check(phone, '1', verificationCode, function (err, resp) {
      if (err) return res.status(400).json(err);
      
      if(resp.success) {
        db.Phone.update(
          { isVerified: true },
          { where: { phone: req.body.phone }}
        )
        .then(updatedPhone => {
          console.log(updatedPhone)
        })
        .catch(err => console.log(err))
        // res.status(400).json({ message: err.errors[0].message }
      }
      res.json(resp);
  });
}

module.exports = {
  textAllPhone,
  sendVerification,
  verifyPhone,
}