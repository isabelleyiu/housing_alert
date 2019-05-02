const axios = require('axios');
const moment = require('moment');
const db = require('../models');
const twilioController = require('./twilio-controller');

// move into util
const fetchHousingData = () => {
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
        const { unitType, minMonthlyRent, maxMonthlyRent, minPercentIncome, maxPercentIncome, minPriceWithParking, maxPriceWithParking, minPriceWithoutParking,maxPriceWithoutParking } = housing.unitSummaries.general[0];
        const { Tenure } = housing;
        
        let rent = null;
        let price = null;
        
        if(Tenure === "Re-rental") {
          if(minMonthlyRent === null && maxMonthlyRent === null){
            rent = `${minPercentIncome}% of Income`;
          } else if(minPercentIncome !== maxPercentIncome) {
            rent = `${minPercentIncome}% - ${maxPercentIncome}% of Income`;
          } else if(minMonthlyRent !== maxMonthlyRent) {
            rent = `$${minMonthlyRent} - $${maxMonthlyRent}`
          } else {
            rent = `$${minMonthlyRent}`;
        }
      }
        
        if(Tenure === "Resale") {
          if(minPriceWithParking !== maxPriceWithParking) {
            price = `$${minPriceWithParking} - $${maxPriceWithParking}`;
          } else if(minPriceWithParking) {
            price = `$${minPriceWithParking}`;
          } else if(minPriceWithoutParking !== maxPriceWithoutParking){
            price = `$${minPriceWithoutParking} - $${maxPriceWithoutParking}`;
          } else {
            price = `$${minPriceWithoutParking}`;
          }
        }
        if(created) {
          twilioController.textAllPhone(
            `Housing Alert! Building Name: ${housing.Building_Name} Address: ${housing.Building_Street_Address}, San Francisco Unit Type: ${unitType} Tenure: ${Tenure} Rent/Price: ${rent || price} Application Due: ${moment(housing.Application_Due_Date).format('dddd MMMM Do YYYY')} Reply 'apply' to apply now. Reply 'unsubscribe' to unsubscribe from all future notification`
          )}
        console.log(created)
      })
      .catch(err => console.log(err))
    })
  })
  .catch(err => console.log(err))
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