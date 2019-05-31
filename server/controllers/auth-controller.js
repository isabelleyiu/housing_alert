const db = require('../models');
const passport = require('passport');

// @route   POST api/auth/
// @usage   Login user
// @access  Public
const login = (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone && password) {
    return res
      .status(400)
      .json({ message: 'Phone Number and Password are required to login' });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    if (!user) {
      return res.status(401).json({
        isLogin: false,
        message: 'Login failed. Your Phone or Password is incorrect'
      });
    }

    // Manually establish the session...
    req.login(user, err => {
      const {
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
        twoBedroom
      } = user.dataValues;
      if (err) {
        return res.status(401).json({
          isLogin: false,
          message: 'Login failed...'
        });
      } else {
        res.cookie('sid', req.session.id, { maxAge: 30 * 60 * 1000 });
        res.cookie('isAuthenticated', true, { maxAge: 30 * 60 * 1000 });
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
};

const logout = (req, res, next) => {
  res.clearCookie('sid');
  res.clearCookie('isAuthenticated');
  req.session.destroy();
  req.logout();
  return res.json({
    isLogin: req.isAuthenticated(),
    message: 'Logout success'
  });
};

module.exports = {
  login,
  logout
};
