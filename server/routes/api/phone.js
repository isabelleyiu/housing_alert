const router = require('express').Router();
const phoneController = require('../../controllers/phone-controller');
const userController = require('../../controllers/user-controller');

// @route: /api/phone
router.route('/')
  .get(phoneController.showAll)
  .post(phoneController.register)
  .delete(phoneController.deletePhoneByPhoneNumber)

// router.route('/:uuid')
//   .get(auth, phoneController.optoutSMS)



module.exports = router;