const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  instructions: { type: String, required: true },
  suitableEnvironments: [{ type: String, enum: ['gym', 'studio', 'home'] }],
  requiredEquipment: [{ type: String }],
  difficultyLevel: { type: Number, min: 1, max: 5 },
  muscleGroups: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
