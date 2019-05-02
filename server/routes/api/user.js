const router = require('express').Router();
const userController = require('../../controllers/user-controller');
const { isAuthenticate } = userController;
const passport = require('passport');

// PUBLIC /api/user
router.route('/')
  .get(userController.getAll)
  .post(userController.signup)

router.route('/login')
  .post(userController.login)
router.route('/logout')
  .get(userController.logout)
router.route('/auth')
  .get(userController.isAuthenticate)
// PRIVATE /api/user/:uuid
router.route('/:uuid')
  .get(isAuthenticate, userController.showProfile)
  .delete(isAuthenticate, userController.deleteProfile)
  .patch(isAuthenticate, userController.updateProfile)
  



module.exports = router;
  