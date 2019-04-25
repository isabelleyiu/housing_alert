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

// /api/profile/:id
router.route('/signup')
  // .put(profileController.update)
  // .delete(profileController.delete);



module.exports = router;
  