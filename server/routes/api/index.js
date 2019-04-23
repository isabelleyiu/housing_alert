const router = require('express').Router();

const housingRoutes = require('./housings');
const userRoutes = require('./users');
const profileRoutes = require('./profile');

// /api/....
router.use("/user", userRoutes);
// router.use("/housing", housingRoutes);
// router.use("/profile", profileRoutes);

module.exports = router;