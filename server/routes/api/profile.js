// const router = require('express').Router();
// const mongoose = require('mongoose');
// const passport = require('passport');

// const Profile = require('../../models/Profile');
// const { validateProfile } = require('../../validation');

// // @route   GET api/profile
// // @usage   Display user profile
// // @access  Private
// router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//   const errors = {};

//   Profile.findOne({ user: req.user.id })
//     .then(profile => {
//       if(!profile) {
//         errors.noProfile = 'There is no profile associated with this user'
//         return res.status(404).json(errors);
//       }
//       return res.json(profile);
//     })
//     .catch(err => res.status(404).json(err));
// }); 

// // @route   POST api/profile
// // @usage   Create user profile
// // @access  Private
// router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//   const { errors, isValid } = validateProfile(req.body);
//   if(!isValid) {
//     return res.status(400).json(errors);
//   }

//   const profileInput = {};
//   profileInput.user_id = req.user.id;
  
//   for(let key in req.body) {
//     if(req.body[key]) {
//       profileInput[key] = req.body[key];
//     }
//   }

//   Profile.findOne({ user_id: req.user.id })
//     .then(profile => {
//       if(profile) {
//         // if profile exist, do an update
//         Profile.findOneAndUpdate(
//           { user_id: req.user.id },
//           { $set: profileInput },
//           { new: true }
//         ).then(profile => res.json(profile))
//       } else {
//         // create new profile
//          new Profile(profileInput)
//          .save()
//          .then(profile => res.json(profile));
//       }
//     })
// });



// module.exports = router;



// const router = require('express').Router();
// const User = require('../../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { secretOrKey } = require('../../config/keys');
// const { validateSignup, validateLogin } = require('../../validation/');

// // @route   POST api/users/signup
// // @usage   Signup user
// // @access  Public
// router.post('/signup', (req, res) => {
//   const { errors, isValid } = validateSignup(req.body);

//   // check input validation
//   if(!isValid) {
//     return res.status(400).json(errors);
//   }

//   const { phone, password } = req.body;
//   User.findOne({ phone })
//     .then(user => {
//       if(user) {
//         errors.phone = 'An account associated with this phone number already exists';
//         return res.status(400).json(errors);
//       } else {
//         const newUser = new User({
//           phone,
//           password,
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if(err) {
//               throw err;
//             }
//             newUser.password = hash;
//             newUser.save()
//               .then(user => res.json(user))
//               .catch(err => console.log(err))
//           })
//         });
//       }
//     })
//     .catch(err => console.log(err));
// });

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



// module.exports = router;



// const router = require('express').Router();
// const profileController = require('../../controllers/profile-controller');

// // /api/profile
// router.route("/")
//   .get(profileController.find)
//   .put(profileController.update)
//   .delete(profileController.delete);

// // /api/profile/auth 
// router.route("/auth")
//   .post(profileController.auth)

//   module.exports = router;
  