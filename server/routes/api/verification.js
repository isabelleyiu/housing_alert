const router = require('express').Router();
const twilioController = require('../../controllers/twilio-controller');


// @route: /api/verification/
router.route('/start')
  .post(twilioController.sendVerification)

router.route('/verify')
  .post(twilioController.verifyUser)

module.exports = router;