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



const router = require('express').Router();
const userController = require('../../controllers/userController');

// @route: /api/user
router.route("/")
  .post(userController.create)
//   .put(userController.update)
//   .delete(userController.delete);
  
// // /api/user/usernumberhere
// router.route("/:num")
//   .get(userController.find)


// // /api/user/all 
// router.route("/all")
//   .get(userController.findAll)
//   .put(userController.updateAll)
//   .delete(userController.deleteAll);

  module.exports = router;