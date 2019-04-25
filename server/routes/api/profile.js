const router = require('express').Router();
const profileController = require('../../controllers/profile-controller');

// /api/profile
router.route("/")
  .get(profileController.getAllProfiles)

// /api/profile/
router.route('/signup')
  .post(profileController.signup)

router.route('/login')
  .post(profileController.login)

// PRIVATE /api/profile/:uuid
router.route('/:uuid')
  // .get(profileController.getProfile)
  .delete(profileController.deleteProfile);
  // .put(profileController.update)
  



module.exports = router;
  