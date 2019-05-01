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
  
  
  // only run if verifyCallback returns (null, user), run once per session
  // create cookie
  // store user.uuid with the session
  passport.serializeUser((user, done) => {
    done(null, user.dataValues.uuid)
  }) 
  
  // read cookie
  passport.deserializeUser((uuid, done) => {
    db.User.findOne({ where: { uuid: uuid }})
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null)
      });
  });
}
