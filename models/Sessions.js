const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
  date: { type: Date, required: true, default: Date.now() },
  time: { type: Date, required: true, default: Date.now() },
  client: { type: mongoose.ObjectId, required: true },
  physio: { type: mongoose.ObjectId, required: true },
  price: { type: Number, required: true },
  sessionNumber: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
  notes: { type: String, required: true },
});

module.exports = mongoose.model('Sessions', SessionSchema);
