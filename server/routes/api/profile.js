const router = require('express').Router();
const profileController = require('../../controllers/profile-controller');

// /api/profile
// router.route("/")
  // .get(profileController.find)
  // .put(profileController.update)
  // .delete(profileController.delete);

// /api/profile/
router.route('/signup')
  .post(profileController.signup)


module.exports = router;
  