const router = require('express').Router();

const userRoutes = require('./user');
const verificationRoutes = require('./verification');
const profileRoutes = require('./profile');
// const housingRoutes = require('./housings');


// @route:  /api/
router.use('/user', userRoutes);
router.use('/verification', verificationRoutes);
router.use('/profile', profileRoutes);
// router.use("/housing", housingRoutes);


module.exports = router;