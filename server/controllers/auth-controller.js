const db = require('../models');
const passport = require('passport');

// @route   POST api/auth/
// @usage   Login user
// @access  Public
const login = (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone && password) {
    return res.status(400).json({ message: 'Phone Number and Password are required to login' });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) return res.status(400).json(err);
    if (!user) {
      return res.status(403).json({
        isLogin: false,
        message: 'Login failed. Your Phone or Password is incorrect'
      });
    }

    // Manually establish the session...
    req.login(user, (err) => {
      const { uuid, phone, firstName, lastName, DOB, age, householdSize, householdIncome, SRO, studio, oneBedroom, twoBedroom } = req.user.dataValues;
      if (err) {
        return res.status(403).json({
          isLogin: false,
          message: 'Login failed...'
        });
      } else {
        // save userUUID to Session 
        // req.session.userUUID = req.session.passport.user;
        // req.session.save();
        // console.log(req.session.passport.user)
        res.cookie('sid', req.session.id);
        res.cookie('isAuthenticated', true);
        return res.json({
          uuid,
          phone,
          firstName,
          lastName,
          DOB,
          age,
          householdSize,
          householdIncome,
          SRO,
          studio,
          oneBedroom,
          twoBedroom,
          isLogin: true,
          message: 'Logged in success'
        });
      }
    });
  })(req, res, next);
}

const logout = (req, res, next) => {
  res.clearCookie('sid');
  res.clearCookie('isAuthenticated');
  req.session.destroy();
  req.logout();
  return res.json({
    isLogin: req.isAuthenticated(),
    message: 'Logout success'
  })
}


module.exports = {
  login,
  logout
}