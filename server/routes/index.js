const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api/v1/', apiRoutes);

module.exports = router;
