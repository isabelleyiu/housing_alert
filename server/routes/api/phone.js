const router = require('express').Router();
const phoneController = require('../../controllers/phone-controller');
const twilioController = require('../../controllers/twilio-controller');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// @route: /api/phone
router
  .route('/')
  .get(phoneController.showAll)
  .post(phoneController.register)
  .delete(phoneController.deletePhoneByPhoneNumber);

// use session to persist SMS user state
router
  .use(
    session({
      store: new RedisStore({}),
      secret: process.env.SESSION_SECRET,
      // resave: default true
      resave: false,
      // saveUninitialized(new but not modified): default true
      saveUninitialized: true,
      cookie: {
        maxAge: 30 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
      }
    })
  )
  .route('/sms')
  .post(twilioController.handleIncomingSMS)
  .get(phoneController.toggleSMSoption);

module.exports = router;
