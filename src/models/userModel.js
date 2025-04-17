const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true, sparse: true }, // Opcional para cadastro tradicional
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false }, // Apenas para cadastro tradicional
  age: { type: Number },
  height: { type: Number }, // em cm
  weight: { type: Number }, // em kg
  sex: { type: String, enum: ['male', 'female', 'other'] },
  subscriptionType: { type: String, enum: ['free', 'paid'], default: 'free' },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);