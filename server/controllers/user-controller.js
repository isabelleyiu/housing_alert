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
  const { password, phone } = newUser;

  // validate password
  const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
  if(validate.test(req.body.password) === false) {
    return res.json({ message: 'Password must be 6 to 12 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.'})
  }

  if(password !== confirmPassword) {
    return res.json({ message: 'Confirm Password must match Password' })
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

      req.login(user, (err) => {
        if(err) { 
          return res.status(403).json({ 
            isLogin: false,
            message: 'Login failed...'
          });
        } else {
          const newUser = user.dataValues;
          newUser.isLogin = true;
          newUser.message = `Welcome ${newUser.firstName}. Your user profile has been successfully created`;
          return res.json(newUser)
        }
      });
    } else {
      return res.status(403).json({ 
        created: false,
        message: `An user profile associate with phone number ${phone} already exists in the system.` 
      });
    }
  })
  // err.errors[0].message
  .catch(err => res.status(400).json({ message: err }))
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
          return res.status(403).json({ 
            isLogin: false,
            message: 'Login failed. Your Phone or Password is incorrect'
           });
      }

      // Manually establish the session...
      req.login(user, (err) => {
        // console.log('req.login: ', req.user)
        const { phone, firstName, lastName, DOB, age, householdSize, householdIncome, SRO, studio, oneBedroom, twoBedroom } = req.user.dataValues;
        if(err) {
          return res.status(403).json({ 
            isLogin: false,
            message: 'Login failed...'
          });
        } else {
          return res.json({ 
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
  req.logout();
  req.session.destroy();
  res.json({
    isLogin: req.isAuthenticated(),
    message: 'Logout success'
  })
}

const isAuthenticate = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({
      isLogin: false,
      message: 'Access denied, please log in'
    });
  }
  req.user.dataValues.isLogin = true;
  next();
}


// @route   GET api/user/:uuid
// @usage   show user profile
// @access  Private
const showProfile = (req, res, next) => {
  // retrieve deserialized user via req.user
  return res.json(req.user.dataValues)
}

// @route   DELETE api/user/:uuid
// @usage   delete user profile
// @access  Private
const deleteProfile = (req, res, next) => {
  db.User.destroy({
    where: { uuid: req.user.dataValues.uuid}
  })
    .then(deletedUser => res.json({ message: 'User deleted' }))
    .catch(err => res.status(404).json({ message: 'User not found' }))
}

// @route   PATCH api/user/:uuid
// @usage   update user profile
// @access  Private
const updateProfile = (req, res, next) => {
  const newInfo = req.body;
  db.User.findOne({
    where: {uuid: req.user.dataValues.uuid}
  })
  .then(user => {
    for(let key in req.body) {
      user[key] = req.body[key];
    }
    user.save({fields: ['firstName', 'lastName', 'DOB', 'householdSize', 'householdIncome', 'SRO', 'studio', 'oneBedroom', 'twoBedroom']})
      .then(() => {
        return res.json({
          isUpdated: true
        })
      })
      .catch(err => {
        return res.status(400).json(err)
      })
  })
  .catch(err => console.log(err))

   // if phone was updated, update db.Phone
}

module.exports = {
  getAll,
  signup,
  login,
  logout,
  isAuthenticate,
  showProfile,
  deleteProfile,
  updateProfile
}

