const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  recommendedReps: { type: Number, required: true },
  recommendedSets: { type: Number, required: true },
  frequencyPerWeek: { type: Number, required: true },
  durationWeeks: { type: Number, required: true },
  weeklyLoadIncreaseLimit: { type: Number, required: true },
  techniqueExerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }, // Exercício para melhorar técnica
  prescriptionDate: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
