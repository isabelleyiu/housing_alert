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
      // if it's a new phone, save it to db
      phone.dataValues.message = `A text message is sent to ${phone.phone}`;
      phone.dataValues.created = created;
      
      // if phone exists, check if phone has been verified
      // if phone exitsts && isVerified === false --> returning user that hasnt verify
      if(phone.dataValues.isVerified === false) {
        phone.dataValues.message = `Please verify your number ${phone.phone}`;
        phone.dataValues.created = created;
      } 
    }
    return res.json(phone.dataValues);
  })
  .catch(err => {
    console.log(err)
    return res.status(400).json({ message: 'Please enter a valid 10 digit US phone number 4151234567' })
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

const optoutSMS = (req, res) =>{
  db.Phone.update(
    { isVerified: false },
    { where: { userUUID: req.user.uuid } }
  ).then(updatedPhone => {
     return res.json({message: 'You have successfully opt out for SMS'})
  }).catch(err => console.log(err))
}


module.exports = {
  showAll,
  register,
  deletePhoneByPhoneNumber,
  optoutSMS
}