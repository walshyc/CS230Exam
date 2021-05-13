const mongoose = require('mongoose');
const Session = require('./Sessions');

const ClientSchema = mongoose.Schema({
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
  dob: { type: Date, required: true },
  createdDate: { type: Date, required: true, default: Date.now() },
  parentGuardian: { type: String },
  permission: { type: Boolean, required: true },
  doctor: { type: String, required: true },
  referredBy: { type: String, required: true },
});


module.exports = mongoose.model('Client', ClientSchema);
