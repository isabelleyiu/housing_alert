const router = require('express').Router();
const housingController = require('../../controllers/housing-controller');

// /api/housing

router.route('/').get(housingController.getAll);

router.route('/fetch').get(housingController.fetchHousingData);

router.route('/eligible').post(housingController.getEligible);

module.exports = router;
