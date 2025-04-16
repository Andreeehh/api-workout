const mongoose = require('mongoose');

const trainingEnvironmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  environmentType: { type: String, enum: ['gym', 'studio', 'home'], required: true },
  equipment: [{ type: String }], // Lista de equipamentos disponíveis
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TrainingEnvironment', trainingEnvironmentSchema);
