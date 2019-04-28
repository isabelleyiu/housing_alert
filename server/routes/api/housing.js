const router = require('express').Router();
const housingController = require('../../controllers/housing-controller');

// /api/housing
router.route("/fetch")
  .get(housingController.fetchHousingData)

router.route("/")
  .get(housingController.getAll)
//   .post(housingController.create)
//   .put(housingController.update)
//   .delete(housingController.delete);

module.exports = router;