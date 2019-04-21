const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const { validateProfile } = require('../../validation');

// @route   GET api/profile
// @usage   Display user profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noProfile = 'There is no profile associated with this user'
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));
}); 

// @route   POST api/profile
// @usage   Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfile(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const profileInput = {};
  profileInput.user_id = req.user.id;
  
  for(let key in req.body) {
    if(req.body[key]) {
      profileInput[key] = req.body[key];
    }
  }

  Profile.findOne({ user_id: req.user.id })
    .then(profile => {
      if(profile) {
        // if profile exist, do an update
        Profile.findOneAndUpdate(
          { user_id: req.user.id },
          { $set: profileInput },
          { new: true }
        ).then(profile => res.json(profile))
      } else {
        // create new profile
         new Profile(profileInput)
         .save()
         .then(profile => res.json(profile));
      }
    })
});



module.exports = router;