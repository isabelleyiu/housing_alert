const router = require('express').Router();
const userController = require('../../controllers/user-controller');

// @route: /api/user
router.route('/')
  .get(userController.showAllUsers)
  .post(userController.createNewUser)
  .delete(userController.deleteUserByPhoneNumber);
  

// @route: /api/user/:phone
// router.route('/:phone')
  // .get(userController.findUserById)
//   .put(userController.update)
  


module.exports = router;