const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, required: true },
  pincode:    { type: String, required: true },
  familySize: { type: String, required: true },
  sumInsured: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
