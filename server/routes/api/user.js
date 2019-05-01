const router = require('express').Router();
const userController = require('../../controllers/user-controller');
const { authenticate } = userController;
const passport = require('passport');

// PUBLIC /api/user
router.route('/')
  .get(userController.getAll)
  .post(userController.signup)

router.route('/login')
  .post(userController.login)
router.route('/logout')
  .get(userController.logout)

// PRIVATE /api/user/:uuid
router.route('/:uuid')
  .get(authenticate, userController.showProfile)
  .delete(authenticate, userController.deleteProfile)
  .patch(authenticate, userController.updateProfile)
  



module.exports = router;
  