const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, required: true },
  planType:   { type: String, required: true, enum: ['Basic Care', 'Premium Care', 'Family Plan'] },
  sumInsured: { type: String, required: true },
  familySize: { type: String, required: true },
  startDate:  { type: Date,   required: true },
  premium:    { type: Number, required: true },
  status:     { type: String, default: 'Active', enum: ['Active', 'Pending', 'Expired'] }
}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
