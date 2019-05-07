const router = require('express').Router();
const userController = require('../../controllers/user-controller');
const auth = require('../../middlewares/auth');

// PUBLIC /api/user
router.route('/')
  .get(userController.getAll)
  .post(userController.signup);

// PRIVATE /api/user/:uuid
router.route('/:uuid')
  .delete(auth, userController.deleteProfile)
  .patch(auth, userController.updateProfile);

router.route('/profile')
  .get(auth, userController.showProfile)

module.exports = router;
