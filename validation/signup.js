const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateSignup = input => {
  const errors = {};

  input.phone = input.phone || '';
  input.password = input.password || '';
  input.confirmedPassword = input.confirmedPassword || '';

  if(!Validator.isMobilePhone(input.phone)) {
    errors.phone = 'Please enter a valid US phone number'
  }

  if(Validator.isEmpty(input.phone)) {
    errors.phone = "Phone Number is required"
  }

  if(!Validator.isLength(input.password, {min: 6, max: 12})) {
    errors.password = 'Password must be between 6 and 12 characters'
  }

  if(Validator.isEmpty(input.password)) {
    errors.password = 'Password is required';
  }

  if(Validator.isEmpty(input.confirmedPassword)) {
    errors.confirmedPassword = 'Confirmed password is required';
  }

  if(!Validator.equals(input.confirmedPassword, input.password)) {
    errors.confirmedPassword = 'Confirmed Password must match your password'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateSignup;