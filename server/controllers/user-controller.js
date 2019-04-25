const db = require("../models");


const createNewUser = (req, res) => { 
  const { phone } = req.body;
  db.User.findOrCreate({ 
    where: { phone }, 
    defaults: { phone }})
  .then(([user, created]) => {
    if(created) {
      user.dataValues.message = `Thank you for registering your number! Please enter the verification code we texted to ${phone} to complete the registration process`
      return res.json(user.dataValues);
    } 
    return res.json({ message: `Phone Number ${phone} already exists in the system.` });
  })
  .catch(err => {
    console.log(err)
    return res.status(400).json({ message: 'Registration Failed...' })
  })
}

const showAllUsers = (req, res) => {
  db.User.findAll()
    .then(users => {
      return res.json(users)
    })
    .catch(err => res.status(400).json(err))
}

const deleteUserByPhoneNumber = (req, res) =>{
  db.User.destroy(
    { where: { phone: req.body.phone } }
  ).then(deletedUser => {
    if(deletedUser === 1) {
      return res.json({ message: 'Success. Your phone number has been removed from the system'});
    } else if(deletedUser === 0) {
      return res.json({ message: 'Sorry. We were not able to located your number in our system'});
    }
  })
}


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


module.exports = {
  createNewUser,
  showAllUsers,
  deleteUserByPhoneNumber,
}