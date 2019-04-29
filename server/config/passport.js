const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: "phone",
      passwordField: "password",
      passReqToCallback: true
    },
    // authenticate user
    function verifyCallback(req, phone, password, done) {
      db.User.findOne({ where: { phone } })
        .then(user => {
          if (!user) return done(null, false); 

          bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
            .catch(err => {
              if (err) return done(err);
            })
        })
    }
  ));
  
  
  
  // create cookie
  // store user.uuid with the session
  passport.serializeUser((user, done) => {
    done(null, user.dataValues)
  }) 
  
  // read cookie
  // once a user has been authenticated and serialized, we now find that user in the database on every request. This allows passport to have some useful methods on the request object like req.user (the current user logged in) and req.isAuthenticated() (returns true if the user is logged in or false if not)
  passport.deserializeUser((user, done) => {
    db.User.findOne({ where: { uuid: user.uuid }})
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null)
      });
  });
}
