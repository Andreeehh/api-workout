const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true }, // em cm
  weight: { type: Number, required: true }, // em kg
  sex: { type: String, enum: ['male', 'female', 'other'], required: true },
  subscriptionType: { type: String, enum: ['free', 'paid'], default: 'free' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
