const db = require("../models");

const showAll = (req, res) => {
  db.Phone.findAll()
    .then(phones => {
      return res.json(phones)
    })
    .catch(err => res.status(400).json(err))
}

const register = (req, res) => { 
  const { phone } = req.body;
  db.Phone.findOrCreate({ 
    where: { phone }, 
    defaults: { phone }})
  .then(([phone, created]) => {
    if(created) {
      phone.dataValues.message = `Thank you for registering your number! Please enter the verification code we texted to ${phone.phone} to complete the registration process`
      return res.json(phone.dataValues);
    } 
    return res.json({ message: `Phone Number ${phone.phone} already exists in the system.` });
  })
  .catch(err => {
    console.log(err)
    return res.status(400).json({ message: 'Registration Failed...' })
  })
}



const deletePhoneByPhoneNumber = (req, res) =>{
  db.Phone.destroy(
    { where: { phone: req.body.phone } }
  ).then(deletedPhone => {
    if(deletedPhone === 1) {
      return res.json({ message: 'Success. Your phone number has been removed from the system'});
    } else if(deletedPhone === 0) {
      return res.json({ message: 'Sorry. We were not able to located your number in our system'});
    }
  })
}


module.exports = {
  showAll,
  register,
  deletePhoneByPhoneNumber,
}