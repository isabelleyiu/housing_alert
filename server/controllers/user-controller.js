const db = require('../models');
const passport = require('passport');
const bcrypt = require('bcryptjs');


// @route   GET api/user/
// @usage   get all users
// @access  Public
const getAll = (req, res, next) => {
  db.User.findAll()
    .then(users => {
      return res.json(users)
    })
    .catch(err => {
      return res.status(400).json(err)
    })
}

// @route   POST api/user/signup
// @usage   Signup user profile
// @access  Public
const signup = (req, res, next) => {
  // add logic, if user phone is not verified, prompt them to resend code to verify phone
  const { confirmPassword, ...newUser } = req.body;
  const { password, phone } = req.body;

  // validate password
  const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
  if(!validate.test(password)) {
    return res.json({ message: 'Password must be at least 6 characters, no more than 12 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.'})
  }

  if(password !== confirmPassword) {
    return res.json({ message: 'Confirm Password Must match Password' })
  }
    
  db.User.findOrCreate({ 
    where: { phone }, 
    defaults: newUser})
  .then(([user, created]) => {
    if(created) {
      // link user user to user phone table
      db.Phone.update({ userUUID: user.dataValues.uuid }, { where: { phone }})
        .then(() => console.log('User profile linked to phone'))
        .catch(err => console.log(err));

      // user.dataValues.message = `Your user profile has been successfully created`;
      // return res.json(user.dataValues);

      req.login(user.dataValues, (err) => {
        if(err) return res,json({ message: 'Login failed...'});
      });
      return res.json({ message: `Welcome ${user.dataValues.firstName}. Your user profile has been successfully created` })
    } 
    return res.json({ message: `An user profile associate with phone number ${phone} already exists in the system.` });
  })
  .catch(err => res.status(400).json({ message: err.errors[0].message }))
}

// @route   POST api/user/login
// @usage   Login user
// @access  Public
const login = (req, res, next) => {
  const { phone, password } = req.body;

  if(!phone && password) {
    return res.status(400).json({ message: 'Phone Number and Password are required to login'});
  }

  passport.authenticate('local', function(err, user, info) {
      if (err) return res.status(400).json(err);
      if (!user) {
          return res.status(403).json({ message: 'Login failed. Your Phone or Password is incorrect' });
      }

      // Manually establish the session...
      req.login(user, (err) => {
        if(err) return res,json({ message: 'Login failed...'});
      });
      return res.json({ message: 'Logged in success' })
    
  })(req, res, next);

}

const authenticate = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({message: 'Access denied, please log in'});
  }
  next();
}


// @route   GET api/user/:uuid
// @usage   show user users
// @access  Private
const showProfile = (req, res, next) => {
  console.log(req.user)
  return res.json(req.user.dataValues)
}

// @route   DELETE api/user/:uuid
// @usage   delete user users
// @access  Private
const deleteProfile = (req, res, next) => {
  db.User.destroy({
    where: { uuid: req.user.dataValues.uuid}
  })
    .then(deletedUser => res.json({ message: 'User deleted' }))
    .catch(err => res.status(404).json({ message: 'User not found' }))
}

const updateProfile = (req, res, next) => {
  
}

module.exports = {
  getAll,
  signup,
  login,
  authenticate,
  showProfile,
  deleteProfile,
  updateProfile
}

