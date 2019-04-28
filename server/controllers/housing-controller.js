const axios = require('axios');
const cron = require('node-cron');
const moment = require('moment');
const db = require('../models');
const twilioController = require('./twilio-controller');

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
      db.Housing.findOrCreate({ 
        where: { listingID: housing.listingID }, 
        defaults: housing 
      })
      .then(([housing, created]) => {
        // if created -> text user about new housing
        if(created) {
          twilioController.textAllPhone(
            `Housing Alert 🏠 🚨
            Building Name: ${housing.Building_Name}
            Address: ${housing.Building_Street_Address}, San Francisco
            Unit Type: ${housing.unitSummaries.general[0].unitType}
            Rent: ${housing.unitSummaries.general[0].minMonthlyRent} 
            Application Due: ${moment(housing.Application_Due_Date).format('dddd MMMM Do YYYY')}
  
            Reply with '1' to apply now
            Reply with '0' to unsubscribe from all future notification`
          )}
        console.log(created)
      })
      .catch(err => res.json(err))
    })
    next()
  })
  .catch(err => res.json(err))
}

const getAll = (req, res, next) => {
  db.Housing.findAll()
  .then(housings => {
    const filtered = housings.filter(housing => moment(housing.Application_Due_Date).isSameOrAfter(Date.now()))
    return res.json(filtered)
  })
  .catch(err => {
    return res.status(400).json(err)
  })
}

module.exports = {
  fetchHousingData,
  getAll,
}