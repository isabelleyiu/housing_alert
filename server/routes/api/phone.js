const router = require('express').Router();
const phoneController = require('../../controllers/phone-controller');

// @route: /api/phone
router.route('/')
  .get(phoneController.showAll)
  .post(phoneController.register)
  .delete(phoneController.deletePhoneByPhoneNumber);
  


module.exports = router;