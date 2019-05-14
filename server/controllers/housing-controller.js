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

      currentHousing.forEach(fetchHousing => {
        db.Housing.findOrCreate({
          where: { listingID: fetchHousing.listingID },
          defaults: fetchHousing
        })
          .then(([housing, created]) => {
            // if created -> text user about new housing
            const housingInfo = formatHousingResult(housing);
            if (created) {
              twilioController.textAllPhone(housingInfo);
            } else {
              // if there's an update since we have created it
              // LastModifiedDate comes after updatedAt, update it
              if (
                moment(fetchHousing.LastModifiedDate).isAfter(housing.updatedAt)
              ) {
                housing.update(fetchHousing).then(() => {
                  console.log('updated');
                });
              }
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
