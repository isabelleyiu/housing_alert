const db = require('../models');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// @route   GET api/profile/
// @usage   get all user profiles
// @access  Public
const getAllProfiles = (req, res) => {
  db.Profile.findAll()
    .then(profiles => {
      return res.json(profiles)
    })
    .catch(err => {
      return res.status(400).json(err)
    })
}


// @route   POST api/profile/signup
// @usage   Signup user
// @access  Public
const signup = (req, res) => {
  // add logic, if user phone is not verified, have them verify phone before allowing them to create profile


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

  const newProfile = {
    phone, password, email, firstName, lastName, householdSize, householdIncome, studio, SRO, oneBedroom, twoBedroom 
  }

  bcrypt.hash(password, 10)
    .then(hashedPassWord => (newProfile.password = hashedPassWord))
    .catch(err => console.log(err))

    db.Profile.findOrCreate({ 
      where: { phone }, 
      defaults: newProfile})
    .then(([profile, created]) => {
      if(created) {
        profile.dataValues.message = `Your profile has been successfully created`
        
        // link user profile to user phone table
        db.User.findOne({
          where: {phone: phone}
        })
          .then(user => {
            user.update({
              profileUUID: profile.dataValues.uuid
            })
            .then(() => console.log('user profile UUID updated'))
            .catch(err => console.log(err));
            
         
          })
          .catch(err => console.log(err))

        return res.json(profile.dataValues);
      } 
      return res.json({ message: `A profile associate with phone number ${phone} already exists in the system.` });
    })
    .catch(err => res.status(400).json({ message: err.errors[0].message }))
}

// @route   POST api/profile/login
// @usage   Login user
// @access  Public
const login = (req, res) => {
  const { phone, password } = req.body;

  db.Profile.findOne({ 
    where: { phone }
  })
    .then(profile => {
      if(!profile) {
        return res.status(404).json({ message: 'Account not found' });
      } 
        const payload = { 
          uuid: profile.uuid,
          phone: profile.phone,
          firstName: profile.firstName, 
          lastName: profile.lastName,
          email: profile.email,
        };

        bcrypt.compare(password, profile.password)
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



module.exports = {
  getAllProfiles,
  signup,
  login,
}

