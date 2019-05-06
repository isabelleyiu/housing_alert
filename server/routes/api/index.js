const router = require('express').Router();

const phoneRoutes = require('./phone');
const verificationRoutes = require('./verification');
const userRoutes = require('./user');
const housingRoutes = require('./housing');
const authRoutes = require('./auth');

// route:  /api/
router.use('/phone', phoneRoutes);
router.use('/verification', verificationRoutes);
router.use('/user', userRoutes);
router.use('/housing', housingRoutes);
router.use('/auth', authRoutes);

module.exports = router;
