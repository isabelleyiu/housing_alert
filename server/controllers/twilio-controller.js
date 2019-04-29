require('dotenv').config();
const db = require('../models');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
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

const handleIncomingSMS = (req, res) => {
  const twiml = new MessagingResponse();
  if(req.body.Body === 'home') {
    twiml.message('Reply "register" to confirm your registration with Housing Alert');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  } else if(req.body.Body === 'register') {
    db.Phone.findOrCreate({ 
      where: { phone: req.body.From.slice(2) }, 
      defaults: { phone: req.body.From.slice(2), isVerified: true }})
    .then(([phone, created]) => {
      if(created) {
        twiml.message('Welcome to Housing Alert. You have successfully signup for housing updates. Please visit our website to create a profile for custom experience.');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      } else {
        twiml.message('Sorry. An account associated with this number already exists.');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      }
    })
    .catch(err => console.log(err))
  } else {
    twiml.message('Sorry. Something went wrong...Please make sure you texted the right command.');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
};

module.exports = {
  textAllPhone,
  sendVerification,
  verifyPhone,
  handleIncomingSMS
}