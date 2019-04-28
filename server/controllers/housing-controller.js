const axios = require('axios');
const cron = require('node-cron');
const moment = require('moment');
const { Housing } = require('../models');

// schedule cron job for fetching housing data
// cron.schedule('12***', () => {
  
// },{
//   scheduled: true,
//   timezone: "America/Los_Angeles"
// });
const fetchHousingData = (req, res, next) => {
  axios.get('https://housing.sfgov.org/api/v1/listings.json')
  .then(result => {
    let housings = result.data.listings;
    const currentHousing = housings.filter(housing => moment(housing.Application_Due_Date).isSameOrAfter(Date.now()));

    currentHousing.forEach(housing => {
      Housing.findOrCreate({ 
        where: { listingID: housing.listingID }, 
        defaults: housing 
      })
      .then(([housing, created]) => {
        // if created -> text user about new housing
        console.log(created)
      })
      .catch(err => console.log(err))
    })
    next()
  })
  .catch(err => res.json(err))
}

const getAll = (req, res, next) => {
  Housing.findAll()
  .then(housing => {
    return res.json(housing)
  })
  .catch(err => {
    return res.status(400).json(err)
  })
}

module.exports = {
  fetchHousingData,
  getAll,
}