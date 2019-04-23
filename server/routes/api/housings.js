// const axios = require('../../models/node_modules/axios');
// const cron = require('node-cron');
// const moment = require('moment');


// // cron.schedule('12***', () => {
  
// // },{
// //   scheduled: true,
// //   timezone: "America/Los_Angeles"
// // });

// axios.get('https://housing.sfgov.org/api/v1/listings.json')
//   .then(res => {
//     let housings = res.data.listings;
//     const currentHousing = housings.filter(housing => moment(housing.Application_Due_Date).isSameOrAfter(Date.now()));
//     console.log(currentHousing);
//   })
//   .catch(err => console.log(err))

const router = require('express').Router();
const housingController = require('../../controllers/housing-controller');

// /api/housing
// router.route("/")
//   .get(housingController.find)
//   .post(housingController.create)
//   .put(housingController.update)
//   .delete(housingController.delete);

// // /api/housing/all 
// router.route("/all")
//   .get(housingController.findAll)
//   .put(housingController.updateAll)
//   .delete(housingController.deleteAll);

  