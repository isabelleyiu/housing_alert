const router = require('express').Router();
const authController = require('../../controllers/auth-controller');
const auth = require('../../middlewares/auth');

// PUBLIC /api/auth
router.route('/')
  .post(authController.login)

// PRIVATE /api/auth
router.route('/')
  .get(auth, authController.logout)

module.exports = router;
