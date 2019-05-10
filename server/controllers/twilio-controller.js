require('dotenv').config();
const db = require('../models');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const authy = require('authy')(process.env.AUTHY_API_KEY);
const moment = require('moment');
const formatHousingResult = require('../utils/formatHousingResult');

const textAllPhone = messageBody => {
  db.Phone.findAll()
    .then(phones => {
      phones.forEach(phone => {
        // check user profile to see
        // db.User.findOne({
        //   where: { uuid: phone.userUUID }
        // }).then(user => {
        //   const { householdSize, householdIncome } = user;
        //   if(maxOccup)
        // });
        if (phone.isVerified) {
          client.messages
            .create({
              body: messageBody,
              from: process.env.TWILIO_PHONE,
              to: `+1${phone.phone}`
            })
            .then(message => console.log(message.status))
            .done();
        }
      });
    })
    .catch(err => console.log(err));
};

const sendVerification = (req, res) => {
  authy
    .phones()
    .verification_start(req.body.phone, '1', 'sms', function(err, resp) {
      if (err) {
        res.status(400).json(err);
      }
      res.json(resp.message);
    });
};

const verifyPhone = (req, res) => {
  const { phone, verificationCode } = req.body;
  authy
    .phones()
    .verification_check(phone, '1', verificationCode, function(err, resp) {
      if (err) return res.status(400).json(err);

      if (resp.success) {
        db.Phone.update(
          { isVerified: true },
          { where: { phone: req.body.phone } }
        )
          .then(updatedPhone => {
            console.log(updatedPhone);
          })
          .catch(err => console.log(err));
        // res.status(400).json({ message: err.errors[0].message }
      }
      res.json(resp);
    });
};

const handleIncomingSMS = (req, res) => {
  const twiml = new MessagingResponse();
  const incomingNumber = req.body.From;
  const inboundSMS = req.body.Body.trim();

  const housingAlertRegex = /housing\s*alert/gi;
  const registerRegex = /register/gi;
  const homeRegex = /home/gi;
  const unsubscribeRegex = /goodbye/gi;

  console.log(inboundSMS);

  if (homeRegex.test(inboundSMS)) {
    db.Housing.findAll()
      .then(housings => {
        const filtered = housings.filter(housing =>
          moment(housing.Application_Due_Date).isSameOrAfter(Date.now())
        );

        filtered.forEach(housing => {
          const housingInfo = formatHousingResult(housing);
          client.messages
            .create({
              body: housingInfo,
              from: process.env.TWILIO_MESSAGING_SERVICES_SID,
              to: incomingNumber
            })
            .then(message => console.log(message.status))
            .done();
        });
      })
      .catch(err => console.log(err));
  } else if (unsubscribeRegex.test(inboundSMS)) {
    db.Phone.update(
      { isVerified: false },
      { where: { phone: incomingNumber.slice(2) } }
    )
      .then(updatedPhone => {
        twiml.message(
          'Thank you for using Housing Alert. You have successfully unsubscribed from our service'
        );
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
      })
      .catch(err => console.log(err));
  } else if (housingAlertRegex.test(inboundSMS)) {
    twiml.message(
      'Welcome to Housing Alert.\nReply "register" to confirm your registration.'
    );
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else if (registerRegex.test(inboundSMS)) {
    db.Phone.findOrCreate({
      where: { phone: incomingNumber.slice(2) },
      defaults: { phone: incomingNumber.slice(2), isVerified: true }
    })
      .then(([phone, created]) => {
        req.session.application = req.session.application || {
          householdSize: null,
          householdIncome: null
        };
        // created: true, new user ->
        if (created) {
          twiml.message(
            'Thank you for registering. We need more information in order to help you find the perfect affordable housing. How many people are in your household?'
            // 'Thank you! You will hear from us when there\'s new release of affordable housing. Or simply text "home" to us anytime to find out what is available. Visit https://housing-alert.herokuapp.com/signup to create a profile for custom experience.'
          );
          res.writeHead(200, { 'Content-Type': 'text/xml' });
          res.end(twiml.toString());
        } else {
          // check if user's household info is already in database
          twiml.message(
            'Thank you! Your number is registered. Text "home" anytime to see what affordable housing is available. Visit https://housing-alert.herokuapp.com/signup to create a profile for custom experience.'
          );
          res.writeHead(200, { 'Content-Type': 'text/xml' });
          res.end(twiml.toString());
        }
      })
      .catch(err => console.log(err));
  } else if (!req.session.application.householdSize) {
    req.session.application.householdSize = inboundSMS;
    console.log(req.session);

    twiml.message(
      `Got it. ${inboundSMS} people are in your household. What is your estimated annual household income? This will help us determine your eligibility.`
    );
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else if (
    req.session.application.householdSize &&
    !req.session.application.householdIncome
  ) {
    req.session.application.householdIncome = inboundSMS;
    console.log(req.session);
    // eligibility according to household size and income
    twiml.message(
      `Got it. Your household Income is ${inboundSMS}/year. We will keep an eye on affordable housing that your are eligible to apply. Text the word "home" anytime to find out what affordable housing is currently accepting application.`
    );
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else {
    twiml.message(
      'Hmm...Please make sure you texted the right command. Text "goodbye" to unsubscribe to our messages.'
    );
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }
};

module.exports = {
  textAllPhone,
  sendVerification,
  verifyPhone,
  handleIncomingSMS
};
