const router = require('express').Router();

const phoneRoutes = require('./phone');
const verificationRoutes = require('./verification');
const userRoutes = require('./user');
// const housingRoutes = require('./housings');


// @route:  /api/
router.use('/phone', phoneRoutes);
router.use('/verification', verificationRoutes);
router.use('/user', userRoutes);
// router.use("/housing", housingRoutes);


module.exports = router;