const router = require('express').Router();
const phoneController = require('../../controllers/phone-controller');
const twilioController = require('../../controllers/twilio-controller');

// @route: /api/phone
router.route('/')
  .get(phoneController.showAll)
  .post(phoneController.register)
  .delete(phoneController.deletePhoneByPhoneNumber)

// router.route('/:uuid')
//  
router.route('/sms')
  .post(twilioController.handleIncomingSMS)
  .get(phoneController.toggleSMSoption)

module.exports = router;