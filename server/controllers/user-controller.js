const db = require('../models');

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

// @route   POST api/user/
// @usage   Signup user profile
// @access  Public
const signup = (req, res, next) => {
  // add logic, if user phone is not verified, prompt them to resend code to verify phone
  const { confirmPassword, ...newUser } = req.body;
  const { password, phone } = newUser;

  // validate password
  const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
  if (validate.test(req.body.password) === false) {
    return res.json({ message: 'Password must be 6 to 12 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.' })
  }

  if (password !== confirmPassword) {
    return res.json({ message: 'Confirm Password must match Password' })
  }

  db.User.findOrCreate({
    where: { phone },
    defaults: newUser
  })
    .then(([user, created]) => {
      if (created) {
        // link user user to user phone table
        db.Phone.update({ userUUID: user.dataValues.uuid }, { where: { phone } })
          .then(() => console.log('User profile linked to phone'))
          .catch(err => console.log(err));

        req.login(user, (err) => {
          if (err) {
            return res.status(403).json({
              isLogin: false,
              message: 'Login failed...'
            });
          } else {
            res.cookie('sid', req.session.id);
            res.cookie('isAuthenticated', true);
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


// @route   GET api/user/profile
// @usage   show user profile
// @access  Private
const showProfile = (req, res, next) => {
  // retrieve deserialized user via req.user
  // retrieve user's phone table
  db.Phone.findOne({
    where: { userUUID: req.user.dataValues.uuid }
  })
    .then(phone => {
      req.user.dataValues.phone = phone
      return res.json(req.user.dataValues)
    })
    .catch(err => console.log(err))

}

// @route   DELETE api/user/profile
// @usage   delete user profile
// @access  Private
const deleteProfile = (req, res, next) => {
  db.User.destroy({
    where: { uuid: req.user.dataValues.uuid }
  })
    .then(deletedUser => {
      console.log(deletedUser)
      res.json({ message: 'User deleted' })
    })
    .catch(err => res.status(404).json({ message: 'User not found' }))
}

// @route   PATCH api/user/profile
// @usage   update user profile
// @access  Private
const updateProfile = (req, res, next) => {
  const newInfo = req.body;
  db.User.findOne({
    where: { uuid: req.user.dataValues.uuid }
  })
    .then(user => {
      for (let key in req.body) {
        user[key] = req.body[key];
      }
      user.save({ fields: ['firstName', 'lastName', 'DOB', 'householdSize', 'householdIncome', 'SRO', 'studio', 'oneBedroom', 'twoBedroom'] })
        .then(updatedProfile => {
          return res.json(updatedProfile)
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
  showProfile,
  deleteProfile,
  updateProfile,
}

