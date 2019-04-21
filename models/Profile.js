const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: true
  },
  householdSize: {
    type: Number,
    required: true
  },
  householdIncome: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  age:{
    type: Number,
    min: 18
  },
  liveInSF: {
    type: Boolean
  },
  workInSF: {
    type: Boolean
  },
});

module.exports = mongoose.model('Profile', profileSchema);