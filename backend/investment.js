const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fundTicker: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  purchasePrice: { type: Number, required: true, min: [0.01, 'Price must be greater than 0'] }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Investment', investmentSchema);