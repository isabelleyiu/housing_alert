const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/keys');
const passport = require('passport');

// @route   POST api/users/signup
// @desc    User signup
// @access  Public
router.post('/signup', (req, res) => {
  const { phone, password } = req.body;
  User.findOne({ phone })
    .then(user => {
      if(user) {
        res.status(400).json({
          phone: 'An account associated with this phone number already exists'
        })
      } else {
        const newUser = new User({
          phone,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              throw err;
            }
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        });
      }
    })
});

// @route   POST api/users/login
// @desc    User login
// @access  Public
router.post('/login', (req, res) => {
  const { phone, password } = req.body;

  User.findOne({ phone })
    .then(user => {
      if(!user) {
        res.status(404).json({ phone: 'Account not found' });
      } else {
        const payload = { 
          id: user.id,
          phone: user.phone 
        };

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch) {
              jwt.sign(payload, secretOrKey, { expiresIn: '1h'}, (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              })
            } else {
              res.status(400).json({ password: 'Password incorrect'});
            }
          })
      }
    });
});

// @route   GET api/users/:phone
// @desc    User Account dashboard
// @access  Private
router.get('/:phone', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    phone: req.user.phone
  });
}); 

module.exports = router;