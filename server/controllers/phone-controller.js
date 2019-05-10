const db = require('../models');

const showAll = (req, res) => {
  db.Phone.findAll()
    .then(phones => {
      return res.json(phones);
    })
    .catch(err => res.status(400).json(err));
};

const register = (req, res) => {
  const { phone } = req.body;
  db.Phone.findOrCreate({
    where: { phone },
    defaults: { phone }
  })
    .then(([phone, created]) => {
      const formattedNumber = `(${phone.phone.slice(0, 3)}) ${phone.phone.slice(
        3,
        6
      )}-${phone.phone.slice(6)}`;
      if (created) {
        // created === true && isVerified === false
        // if it's a new phone, save it to db
        phone.dataValues.message = `A text message is sent to ${formattedNumber}`;
        phone.dataValues.created = created;
      } else {
        // created === false && isVerified === false --> returning user that hasnt verify
        if (phone.dataValues.isVerified === false) {
          phone.dataValues.message = `A text message is sent to ${formattedNumber}`;
          phone.dataValues.created = created;
        }
      }
      return res.json(phone.dataValues);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        message: 'Please enter a valid 10 digit US phone number 4151234567'
      });
    });
};

const deletePhoneByPhoneNumber = (req, res) => {
  db.Phone.destroy({ where: { phone: req.body.phone } }).then(deletedPhone => {
    if (deletedPhone === 1) {
      return res.json({
        message: 'Success. Your phone number has been removed from the system'
      });
    } else if (deletedPhone === 0) {
      return res.json({
        message: 'Sorry. We were not able to located your number in our system'
      });
    }
  });
};

const toggleSMSoption = (req, res) => {
  db.Phone.findOne({
    where: { phone: req.user.phone }
  }).then(phone => {
    if (phone.isVerified) {
      phone.isVerified = false;
      phone
        .save()
        .then(updatedPhone => {
          res.json({
            success: true,
            isVerified: updatedPhone.isVerified,
            message: 'You have successfully opt-out for SMS'
          });
        })
        .catch(err => console.log(err));
    } else {
      phone.isVerified = true;
      phone
        .save()
        .then(updatedPhone => {
          res.json({
            success: true,
            isVerified: updatedPhone.isVerified,
            message: 'You have successfully opt-in for SMS'
          });
        })
        .catch(err => console.log(err));
    }
  });
  // db.Phone.update(
  //   { isVerified: false },
  //   { where: { phone: req.user.phone } }
  // ).then(updatedPhone => {
  //   console.log(updatedPhone)

  //   return res.json({
  //     success: true,
  //     message: 'You have successfully opt out for SMS'
  //   })
  // }).catch(err => console.log(err))
};

module.exports = {
  showAll,
  register,
  deletePhoneByPhoneNumber,
  toggleSMSoption
};
