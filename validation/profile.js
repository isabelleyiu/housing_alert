const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateProfile = input => {
  const errors = {};

  input.firstName = input.firstName || '';
  input.lastName = input.lastName || '';
  input.householdSize = input.householdSize || '';
  input.householdIncome = input.householdIncome || '';


  if(Validator.isEmpty(input.firstName)) {
    errors.firstName = "First Name is required"
  }

  if(Validator.isEmpty(input.lastName)) {
    errors.lastName = 'Last Name is required';
  }

  if(Validator.isEmpty(input.householdSize)) {
    errors.householdSize = 'Household Size is required';
  }

  if(Validator.isEmpty(input.householdIncome)) {
    errors.householdIncome = 'Household Income is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateProfile;