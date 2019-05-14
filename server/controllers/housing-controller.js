const axios = require('axios');
const moment = require('moment');
const db = require('../models');
const twilioController = require('./twilio-controller');
const formatHousingResult = require('../utils/formatHousingResult');

// move into util
const fetchHousingData = () => {
  axios
    .get('https://housing.sfgov.org/api/v1/listings.json')
    .then(result => {
      let housings = result.data.listings;
      const currentHousing = housings.filter(housing =>
        moment(housing.Application_Due_Date).isSameOrAfter(Date.now())
      );

      currentHousing.forEach(housing => {
        db.Housing.findOrCreate({
          where: { listingID: housing.listingID },
          defaults: housing
        })
          .then(([housing, created]) => {
            // if created -> text user about new housing
            const housingInfo = formatHousingResult(housing);
            if (created) {
              twilioController.textAllPhone(housingInfo);
            }
            console.log(created);
          })
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
};

const getAll = (req, res, next) => {
  db.Housing.findAll()
    .then(housings => {
      const filtered = housings.filter(housing =>
        moment(housing.Application_Due_Date).isSameOrAfter(Date.now())
      );
      return res.json(filtered);
    })
    .catch(err => {
      return res.status(400).json(err);
    });
};

const getEligible = (req, res, next) => {
  const { householdSize, income } = req.body;
  axios
    .get(
      `https://housing.sfgov.org/api/v1/listings/eligibility.json?householdsize=${householdSize}&incomelevel=${income}&listingsType=rental`
    )
    .then(result => {
      let housings = result.data.listings;
      const currentHousing = housings.filter(housing =>
        moment(housing.Application_Due_Date).isSameOrAfter(Date.now())
      );
      return res.json(currentHousing);
    })
    .catch(err => res.json(err));
};

module.exports = {
  fetchHousingData,
  getAll,
  getEligible
};
