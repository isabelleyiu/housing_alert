require('dotenv').config();

module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@housingalert-ncmsb.mongodb.net/test?retryWrites=true`,
  secretOrKey: process.env.SECRET_KEY,
}