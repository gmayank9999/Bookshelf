// /models/QuoteRequest.js
const mongoose = require('mongoose');

const QuoteRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});

const QuoteRequest = mongoose.model('QuoteRequest', QuoteRequestSchema);

module.exports = QuoteRequest;
