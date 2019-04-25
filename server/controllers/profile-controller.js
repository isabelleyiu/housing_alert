const db = require('../models');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// @route   POST api/profile/signup
// @usage   Signup user
// @access  Public
const signup = (req, res) => {
  const { phone, password, confirmPassword, firstName, lastName, householdSize, householdIncome, studio, SRO, OneBedroom, TwoBedroom } = req.body;

  // validate password

  if(password !== confirmPassword) {
    const err = new Error('Confirm Password Must match Password');
    res.json({ message: err})
  }

  const newProfile = {
    phone, password, firstName, lastName, householdSize, householdIncome, studio, SRO, OneBedroom, TwoBedroom 
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
        return res.json(profile.dataValues);
      } 
      return res.json({ message: `A profile associate with phone number ${phone} already exists in the system.` });
    })
    .catch(err => res.status(400).json({ message: err.errors[0].message }))
}

// // @route   POST api/users/login
// // @usage   Login user
// // @access  Public
// router.post('/login', (req, res) => {
//   const { errors, isValid } = validateLogin(req.body);
//   if(!isValid) {
//     return res.status(400).json(errors);
//   }

//   const { phone, password } = req.body;

//   User.findOne({ phone })
//     .then(user => {
//       if(!user) {
//         errors.phone = 'Account not found';
//         return res.status(404).json({ errors });
//       } else {
//         const payload = { 
//           id: user.id,
//           phone: user.phone 
//         };

//         bcrypt.compare(password, user.password)
//           .then(isMatch => {
//             if(isMatch) {
//               jwt.sign(payload, secretOrKey, { expiresIn: '1h'}, (err, token) => {
//                 return res.json({
//                   success: true,
//                   token: `Bearer ${token}`
//                 });
//               })
//             } else {
//               errors.password = 'Password incorrect';
//               return res.status(400).json({ errors });
//             }
//           })
//       }
//     });
// });



module.exports = {
  signup
}

