const db = require('../models');
const passport = require('passport');
const bcrypt = require('bcryptjs');


// @route   GET api/user/
// @usage   get all users
// @access  Public
const getAll = (req, res) => {
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
const signup = (req, res) => {
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

      user.dataValues.message = `Your user profile has been successfully created`;
      return res.json(user.dataValues);
    } 
    return res.json({ message: `An user profile associate with phone number ${phone} already exists in the system.` });
  })
  .catch(err => res.status(400).json({ message: err.errors[0].message }))
}

// @route   POST api/user/login
// @usage   Login user
// @access  Public
const login = (req, res) => {
  const { phone, password } = req.body;

  if(!phone && password) {
    return res.status(400).json({ message: 'Phone Number and Password are required to login'});
  }

  // passport.authenticate('local', { failureRedirect: '/login' }, function(req, res) {
  //   res.redirect('/');
  // })

}
  // db.User.findOne({ 
  //   where: { phone }
  // })
  //   .then(user => {
  //     if(!user) { 
  //       return res.status(401).json({ message: 'User account not found' });
  //     } 

      // console.log(user)
      // bcrypt.compare(password, user.dataValues.password)
      //   .then(isMatch => {
      //     if(isMatch) {
      //       req.session.user_sid = user.dataValues.uuid;
      //       return res.json({ message: 'Login success'})
      //     } else {
      //       return res.status(401).json({ message: 'Password incorrect'});
      //     }
      //   });
    // });


// @route   GET api/user/:uuid
// @usage   show user users
// @access  Private
const showProfile = (req, res) => {
  // check authorization
  // if(!req.isAuthenticated()) {
  //   return res.status(403).json({ message: 'You are not authorized to view profile' });
  // }

  db.User.findOne({
    where: { uuid: req.session.user_sid}
  })
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ message: 'User not found' }))
}

// @route   DELETE api/user/:uuid
// @usage   delete user users
// @access  Private
const deleteProfile = (req, res) => {
  // check authorization

  db.User.destroy({
    where: { uuid: req.params.uuid}
  })
    .then(deletedUser => res.json({ message: 'User deleted' }))
    .catch(err => res.status(404).json({ message: 'User not found' }))
}


module.exports = {
  getAll,
  signup,
  login,
  showProfile,
  deleteProfile,
}

