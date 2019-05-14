const moment = require('moment');

module.exports = housing => {
  const {
    Tenure,
    Building_Name,
    Building_Street_Address,
    Application_Due_Date,
    listingID
  } = housing;

  const {
    unitType,
    minMonthlyRent,
    maxMonthlyRent,
    minPercentIncome,
    maxPercentIncome,
    minPriceWithParking,
    maxPriceWithParking,
    minPriceWithoutParking,
    maxPriceWithoutParking
  } = housing.unitSummaries.general[0];

  let rent = null;
  let price = null;

  if (Tenure === 'Re-rental') {
    if (minMonthlyRent === null && maxMonthlyRent === null) {
      rent = `${minPercentIncome}% of Income`;
    } else if (minPercentIncome !== maxPercentIncome) {
      rent = `${minPercentIncome}% - ${maxPercentIncome}% of Income`;
    } else if (minMonthlyRent !== maxMonthlyRent) {
      rent = `$${minMonthlyRent} - $${maxMonthlyRent}`;
    } else {
      rent = `$${minMonthlyRent}`;
    }
  }

  if (Tenure === 'Resale') {
    if (minPriceWithParking !== maxPriceWithParking) {
      price = `$${minPriceWithParking} - $${maxPriceWithParking}`;
    } else if (minPriceWithParking) {
      price = `$${minPriceWithParking}`;
    } else if (minPriceWithoutParking !== maxPriceWithoutParking) {
      price = `$${minPriceWithoutParking} - $${maxPriceWithoutParking}`;
    } else {
      price = `$${minPriceWithoutParking}`;
    }
  }

  return `--- HOUSING ALERT ---\nBuilding Name: ${Building_Name}\nAddress: ${Building_Street_Address}, San Francisco\nUnit Type: ${unitType}\nTenure: ${Tenure}\nRent/Price: ${rent ||
    price}\nApplication Due: ${moment(Application_Due_Date).format(
    'dddd MMMM Do YYYY'
  )}\nMore Info: https://housing.sfgov.org/listings/${listingID}.\nReply "goodbye" to unsubscribe from all future notification`;
};
