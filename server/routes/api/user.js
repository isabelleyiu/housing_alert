const router = require('express').Router();
const userController = require('../../controllers/user-controller');
const { authenticate } = userController;
const passport = require('passport');

// /api/user
router.route("/")
  .get(userController.getAll)

// /api/user/
router.route('/signup')
  .post(userController.signup)

router.route('/login')
  .post(userController.login)

// PRIVATE /api/user/:uuid
router.route('/:uuid')
  .get(authenticate, userController.showProfile)
  .delete(authenticate, userController.deleteProfile)
  .patch(authenticate, userController.updateProfile)
  



module.exports = router;
  