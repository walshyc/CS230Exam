const mongoose = require('mongoose');

const PhysioSchema = mongoose.Schema({
  title: { type: String },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  mobile: { type: String, required: true },
  homePhone: { type: String, required: true },
  email: { type: String, required: true },
  addressOne: {
    type: String,
    required: true,
  },
  addressTwo: {
    type: String,
  },
  town: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  eircode: {
    type: String,
  },
});

module.exports = mongoose.model('Physio', PhysioSchema);
