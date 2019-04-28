const axios = require('axios');
const cron = require('node-cron');
const moment = require('moment');
const db = require('../models');


// cron.schedule('12***', () => {
  
// },{
//   scheduled: true,
//   timezone: "America/Los_Angeles"
// });
const fetchHousingData = (req, res, next) => {
  axios.get('https://housing.sfgov.org/api/v1/listings.json')
  .then(res => {
    let housings = res.data.listings;
    const currentHousing = housings.filter(housing => moment(housing.Application_Due_Date).isSameOrAfter(Date.now()));
    console.log(currentHousing)
    
    db.Housing.bulkCreate(
      currentHousing)
      .then(() => db.Housing.findAll())
      .then(housing => console.log(housing))
      .catch(err => console.log(err))
  })
  .catch(err => res.status(400).json(err))
}

const getAll = (req, res, next) => {
  db.Housing.findAll()
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