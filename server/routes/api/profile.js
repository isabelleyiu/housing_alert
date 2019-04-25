const router = require('express').Router();
const profileController = require('../../controllers/profile-controller');

// /api/profile
router.route("/")
  .get(profileController.getAllProfiles)
  // .put(profileController.update)
  // .delete(profileController.delete);

// /api/profile/
router.route('/signup')
  .post(profileController.signup)
  


module.exports = router;
  