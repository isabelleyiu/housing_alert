const router = require('express').Router();
const userController = require('../../controllers/user-controller');

// @route: /api/user
router.route('/')
  .post(userController.createNewUser)
  .get(userController.showAllUsers)

  
// @route: /api/user/:id
// router.route('/:id')
  // .get(userController.findUserById)
//   .put(userController.update)
//   .delete(userController.delete);


// // /api/user/all 
// router.route("/all")
//   .get(userController.findAll)
//   .put(userController.updateAll)
//   .delete(userController.deleteAll);

  module.exports = router;