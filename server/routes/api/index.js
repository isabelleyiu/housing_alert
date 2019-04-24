const router = require('express').Router();

const userRoutes = require('./users');
const verificationRoutes = require('./verification');
const profileRoutes = require('./profile');
const housingRoutes = require('./housings');


// @route:  /api/
router.use('/user', userRoutes);
router.use('/verification', verificationRoutes);
// router.use("/housing", housingRoutes);
// router.use("/profile", profileRoutes);

module.exports = router;