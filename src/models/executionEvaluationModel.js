const mongoose = require('mongoose');

const executionEvaluationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  evaluationScore: {
    type: Number, min: 0, max: 5, required: true,
  }, // 0-5 scale
  evaluationDate: { type: Date, default: Date.now },
  notes: { type: String },
});

module.exports = mongoose.model('ExecutionEvaluation', executionEvaluationSchema);
