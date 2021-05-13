const mongoose = require('mongoose');

const PhoneSchema = mongoose.Schema({
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Phones', PhoneSchema);
