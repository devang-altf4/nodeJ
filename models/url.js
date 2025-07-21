const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortid: {
    type: String,
    required: true,
    unique: true
  },
  redirectUrl: {
    type: String,
    required: true
  },
  visitHistory: [{
    visitTime: { type: Number }, // Fixed field name to match usage
  }]
}, 
{ timestamps: true });

const URL = mongoose.model('url', urlSchema);

module.exports = URL;

