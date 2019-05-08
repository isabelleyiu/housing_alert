module.exports = (housing) => {
  const { unitType, minMonthlyRent, maxMonthlyRent, minPercentIncome, maxPercentIncome, minPriceWithParking, maxPriceWithParking, minPriceWithoutParking, maxPriceWithoutParking } = housing.unitSummaries.general[0];
  const { Tenure, Building_Name, Building_Street_Address, Application_Due_Date } = housing;

  let rent = null;
  let price = null;

  if (Tenure === "Re-rental") {
    if (minMonthlyRent === null && maxMonthlyRent === null) {
      rent = `${minPercentIncome}% of Income`;
    } else if (minPercentIncome !== maxPercentIncome) {
      rent = `${minPercentIncome}% - ${maxPercentIncome}% of Income`;
    } else if (minMonthlyRent !== maxMonthlyRent) {
      rent = `$${minMonthlyRent} - $${maxMonthlyRent}`
    } else {
      rent = `$${minMonthlyRent}`;
    }
  }

  if (Tenure === "Resale") {
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

  return `Housing Alert!%0aBuilding Name: ${Building_Name}%0aAddress: ${Building_Street_Address}, San Francisco%0aUnit Type: ${unitType}%0aTenure: ${Tenure}%0aRent/Price: ${rent || price}%0aApplication Due: ${moment(Application_Due_Date).format('dddd MMMM Do YYYY')}%0aReply 'apply' to apply now.%0aReply 'unsubscribe' to unsubscribe from all future notification`;
}