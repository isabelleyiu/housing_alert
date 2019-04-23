require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);;

client.lookups.phoneNumbers('+15107314004').get((error, number) => {
  console.log(number);
  console.log(number.national_format);
  console.log(number.country_code);

  // This will sometimes be null
  console.log(number.caller_name);
});