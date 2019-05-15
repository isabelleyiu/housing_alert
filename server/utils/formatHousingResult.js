const moment = require('moment');

module.exports = housing => {
  const {
    Tenure,
    Building_Name,
    Building_Street_Address,
    Application_Due_Date,
    listingID
  } = housing;

  const unitDetails = housing.unitSummaries.general;

  let rent = null;
  let price = null;

  const minPrice =
    unitDetails[0].minPriceWithoutParking || unitDetails[0].minPriceWithParking;
  const maxPrice =
    unitDetails[unitDetails.length - 1].maxPriceWithoutParking ||
    unitDetails[unitDetails.length - 1].maxPriceWithParking;
  const minRent = unitDetails[0].minMonthlyRent;
  const maxRent = unitDetails[unitDetails.length - 1].maxMonthlyRent;

  const minPercentIncome = unitDetails[0].minPercentIncome;
  const maxPercentIncome = unitDetails[unitDetails.length - 1].maxPercentIncome;

  const minIncome = unitDetails[0].minRentalMinIncome;
  const maxIncome = unitDetails[unitDetails.length - 1].maxRentalMinIncome;

  let eligibleIncome = null;

  if (!minIncome && !maxIncome) {
    eligibleIncome = '';
  } else if (minIncome !== maxIncome) {
    eligibleIncome = `Min Income: $${minIncome} - $${maxIncome}\n`;
  } else {
    eligibleIncome = `Min Income: $${minIncome}\n`;
  }

  // format Unit Types
  let UnitTypes = [];

  unitDetails.forEach(unit => {
    UnitTypes.push(unit.unitType);
  });

  UnitTypes = UnitTypes.join(', ');

  // format display rent/price

  if (Tenure === 'Re-rental' || Tenure === 'New rental') {
    if (minRent === null && maxRent === null) {
      rent = `${minPercentIncome}% of Income`;
    } else if (minPercentIncome !== maxPercentIncome) {
      rent = `${minPercentIncome}% - ${maxPercentIncome}% of Income`;
    } else if (minRent !== maxRent) {
      rent = `$${minRent} - $${maxRent}`;
    } else {
      rent = `$${minRent}`;
    }
  }

  if (Tenure === 'Resale' || Tenure === 'New sale') {
    if (minPrice !== maxPrice) {
      price = `$${minPrice} - $${maxPrice}`;
    } else {
      price = `$${minPrice}`;
    }
  }

  // SMS message
  return `--- HOUSING ALERT ---\nBUILDING NAME: ${Building_Name}\nADDRESS: ${Building_Street_Address}, San Francisco\nUNIT TYPE: ${UnitTypes}\nTENURE: ${Tenure}\nRENT/PRICE: ${rent ||
    price}\n${eligibleIncome}APPLICATION DUE: ${moment(
    Application_Due_Date
  ).format(
    'dddd MMMM Do YYYY h:mm a'
  )}\n\nMORE INFO: https://housing.sfgov.org/listings/${listingID}.\nREPLY: "Goodbye" to unsubscribe from all future notifications`;
};
