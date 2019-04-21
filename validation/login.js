const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLogin = input => {
  const errors = {};

  input.phone = input.phone || '';
  input.password = input.password || '';

  if(!Validator.isMobilePhone(input.phone)) {
    errors.phone = 'Please enter a valid US phone number'
  }

  if(Validator.isEmpty(input.phone)) {
    errors.phone = "Phone Number is required"
  }

  if(Validator.isEmpty(input.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateLogin;