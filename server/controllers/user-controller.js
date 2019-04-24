require('dotenv').config();
const db = require("../models");
const authy = require('../models/node_modules/authy')(process.env.AUTHY_API_KEY);

module.exports = {
  verifyUser: (req, res) => {
    const { phone, verificationCode } = req.body;
    authy.phones()
    .verification_check(phone, '1', verificationCode, function (err, resp) {
      if (err) {
        // invalid token  
       res.status(400).json(err);
      }
      if(resp.success) {
        //update database, set user.isVerified to true
      //   db.User.update(
      //     { isVerified: true },
      //     { where: { phone: req.body.phone }}
      //   )
      //   .then(updatedUser => {
      //     res.json(updatedUser)
      //   })
      //   .catch(err => res.status(400).json({ message: err.errors[0].message }))
      // }
        res.json(resp)
      }
    });
  },
  sendVerification: (req, res) => {
    authy
    .phones()
    .verification_start(req.body.phone, "1", { via: 'sms', locale: 'en'}, function(err, resp) {
      if (err) {
      console.log(err);
      }
      console.log(resp);
    });
  },
  createNewUser: (req, res) => { 
    db.User.findOrCreate({ 
      where: { phone: req.body.phone }, 
      defaults: { phone: req.body.phone }})
    .then(([user, created]) => {
      if(created) {
        user.dataValues.message = `Your number ${user.dataValues.phone} has been successfully added to our system. Please enter the verification code we text you to complete the registration process`
        return res.json(user.dataValues);
      } 
      return res.json({ message: 'This phone number already exists in the system.' });
    })
    .catch(err => res.status(400).json({ message: err.errors }))
  },
  showAllUsers: (req, res) => {
    db.User.findAll()
      .then(users => {
        return res.json(users)
      })
      .catch(err => res.status(400).json(err))
  },
  deleteUserByPhoneNumber: (req, res) =>{
    db.User.destroy(
      { where: {phone: req.body.phone} }
    ).then(deletedUser => {
      if(deletedUser === 1) {
        return res.json({ message: 'Success. Your phone number has been removed from the system'});
      } else if(deletedUser === 0) {
        return res.json({ message: 'Sorry. We were not able to located your number in our system'});
      }
      
    })
  },
  // find: (req, res) =>{
  //   console.log(req.body)
  //   console.log(req.params.num)
  //   db.User
  //   .findOne({where: req.params.num})
  //   .then(userNum =>{
  //     console.log(userNum)
  //     // true send true to app 
  //     // show user for for profile
  //     // no user found send false show landing page 
      
  //   })
  //   .catch(err =>{console.log(err)})
  // },
  // update: (req, res) =>{

  // },
  // findAll: (req, res) =>{

  // },
  // updateAll: (req, res) =>{

  // },
  // deleteAll: (req, res) =>{

  // }
}