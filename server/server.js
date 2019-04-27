require('dotenv').config();
// =========== APP SETUP ===========
// dependencies
const express = require('express');
const passport = require('passport');
const session  = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

const routes = require('./routes');
const db = require('./models');

// =========== APP CONFIG ===========
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// deploy
if(process.env.NODE_ENV === "production"){
  app.use(express.static("../client/build"));
}

// passport config
require('./config/passport')(passport);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  // cookie: {
  //   expires: 6000000,
  //   httpOnly: false
  // }
}))

// =========== APP INIT ===========

// LOGIN
app.use(passport.initialize());
app.use(passport.session()); 

// routes
app.use(routes);

// =========== APP LAUNCH ===========

db.sequelize.sync()
.then(() => { 
  app.listen(PORT, () => {
    console.log(`Buzzed. Housing Alert is running on port ${PORT}`);
  });
})
.catch(() => console.log('Database connection failed...'))
