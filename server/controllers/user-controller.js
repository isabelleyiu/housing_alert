const db = require('../models');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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


  // const { password, confirmPassword, ...data } = req.body;
  const { phone, password, confirmPassword, email, firstName, lastName, householdSize, householdIncome, studio, SRO, oneBedroom, twoBedroom } = req.body;

  // validate password
  const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
  if(!validate.test(password)) {
    return res.json({ message: 'Password must be at least 6 characters, no more than 12 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.'})
  }

  if(password !== confirmPassword) {
    return res.json({ message: 'Confirm Password Must match Password' })
  }

  const newUser = {
    phone, password, email, firstName, lastName, householdSize, householdIncome, studio, SRO, oneBedroom, twoBedroom 
  }

  bcrypt.hash(password, 10)
    .then(hashedPassWord => (newUser.password = hashedPassWord))
    .catch(err => console.log(err))

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

  db.User.findOne({ 
    where: { phone }
  })
    .then(user => {
      if(!user) {
        return res.status(404).json({ message: 'User account not found' });
      } 
        const payload = { 
          uuid: user.uuid,
          phone: user.phone,
          firstName: user.firstName, 
          lastName: user.lastName,
          email: user.email,
        };

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch) {
              jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h'}, (err, token) => {
                return res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              })
            } else {
              return res.status(400).json({ message: 'Password incorrect'});
            }
          });
    });
}

// @route   GET api/user/:uuid
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
  deleteProfile,
}

