const router = require('express').Router();
const userController = require('../../controllers/user-controller');
const authy = require('../../models/node_modules/authy')(process.env.AUTHY_API_KEY);

// @route: /api/user
router.route('/')
  .post(userController.createNewUser)
  .get(userController.showAllUsers)
  .delete(userController.deleteUserByPhoneNumber);
  
// @route: /api/user/verify
router.route('/verify')
  .post(userController.verifyUser)
router.route('/signup')
  .post(userController.sendVerification)
// @route: /api/user/:phone
// router.route('/:phone')
  // .get(userController.findUserById)
//   .put(userController.update)
  


// // /api/user/all 
// router.route("/all")
//   .get(userController.findAll)
//   .put(userController.updateAll)
//   .delete(userController.deleteAll);

  module.exports = router;