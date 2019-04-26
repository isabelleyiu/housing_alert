const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: "phone",
      passwordField: "password",
      passReqToCallback: true
    },
    // authenticate user
    function verifyCallback(req, phone, password, done) {
      db.User.findOne({ phone }, function (err, user) {
        // db error
        if (err) return done(err); 
        if (!user) return done(null, false); 
        if (!user.verifyPassword(password)) return done(null, false); 
        return done(null, user);
      });
    }
  ));
  
  
  
  // create cookie
  // store user.uuid with the session
  passport.serializeUser((user, done) => {
    done(null, user.uuid)
  }) 
  
  // read cookie
  // once a user has been authenticated and serialized, we now find that user in the database on every request. This allows passport to have some useful methods on the request object like req.user (the current user logged in) and req.isAuthenticated() (returns true if the user is logged in or false if not)
  passport.deserializeUser((user, done) => {
    db.User.find({ where: { uuid: user.uuid }})
      .success(user => {
        done(null, user);
      })
      .error(err => {
        done(err, null)
      });
  });
}
