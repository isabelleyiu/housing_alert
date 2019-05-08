require('dotenv').config();
const db = require('../models');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const authy = require('authy')(process.env.AUTHY_API_KEY);
const moment = require('moment');
const formatHousingResult = require('../utils/formatHousingResult');

const textAllPhone = (messageBody) => {
  db.Phone.findAll()
    .then(phones => {
      phones.forEach(phone => {
        if (phone.isVerified) {
          client.messages.create({
            body: messageBody,
            from: process.env.TWILIO_PHONE,
            to: `+1${phone.phone}`
          })
            .then(message => console.log(message.status))
            .done();
        }
      })
    }).catch(err => console.log(err))
}

const sendVerification = (req, res) => {
  console.log(req.body.phone)
  authy
    .phones()
    .verification_start(req.body.phone, '1', 'sms', function (err, resp) {
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

      if (resp.success) {
        db.Phone.update(
          { isVerified: true },
          { where: { phone: req.body.phone } }
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
  const incomingNumber = req.body.From;
  const inboundSMS = req.body.Body;

  switch (inboundSMS) {
    case 'housing alert':
      twiml.message('Welcome to Housing Alert.\nReply "register" to confirm your registration.');
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
      break;
    case 'register':
      db.Phone.findOrCreate({
        where: { phone: incomingNumber.slice(2) },
        defaults: { phone: incomingNumber.slice(2), isVerified: true }
      })
        .then(([phone, created]) => {
          if (created) {
            twiml.message('You have successfully signup for housing updates. Visit https://housing-alert.herokuapp.com to create a profile for custom experience.');
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
          } else {
            twiml.message('An account associated with this number already exists.');
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
          }
        })
        .catch(err => console.log(err))
      break;
    case 'home':
      db.Housing.findAll()
        .then(housings => {
          const filtered = housings.filter(housing => moment(housing.Application_Due_Date).isSameOrAfter(Date.now()));

          filtered.forEach(housing => {
            const housingInfo = formatHousingResult(housing);
            client.messages.create({
              body: housingInfo,
              from: process.env.TWILIO_PHONE,
              to: incomingNumber
            })
              .then(message => console.log(message.status))
              .done();
          });
        })
        .catch(err => console.log(err))
      break;
    default:
      twiml.message('Something went wrong...Please make sure you texted the right command.');
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
  }
};

module.exports = {
  textAllPhone,
  sendVerification,
  verifyPhone,
  handleIncomingSMS
}