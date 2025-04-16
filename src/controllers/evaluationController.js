const ExecutionEvaluation = require('../models/executionEvaluationModel');
const Prescription = require('../models/prescriptionModel');
const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');

async function generatePrescription(userId, exerciseId, evaluationScore) {
  const user = await User.findById(userId);
  const exercise = await Exercise.findById(exerciseId);

  // Lógica de prescrição baseada na avaliação e dados do usuário
  let recommendedReps; let recommendedSets; let frequencyPerWeek; let durationWeeks; let
    weeklyLoadIncreaseLimit;

  // Exemplo de lógica simplificada (adaptar conforme necessidades reais)
  if (evaluationScore <= 1) {
    // Iniciante
    recommendedReps = 8;
    recommendedSets = 2;
    frequencyPerWeek = 2;
    durationWeeks = 4;
    weeklyLoadIncreaseLimit = 0; // Sem aumento de carga até melhorar técnica
  } else if (evaluationScore <= 3) {
    // Intermediário
    recommendedReps = 10;
    recommendedSets = 3;
    frequencyPerWeek = 3;
    durationWeeks = 3;
    weeklyLoadIncreaseLimit = 5; // 5% de aumento semanal
  } else {
    // Avançado
    recommendedReps = 12;
    recommendedSets = 4;
    frequencyPerWeek = 3;
    durationWeeks = 2;
    weeklyLoadIncreaseLimit = 10; // 10% de aumento semanal
  }

  // Ajustes baseados em idade
  if (user.age > 50) {
    recommendedReps = Math.max(6, recommendedReps - 2);
    weeklyLoadIncreaseLimit = Math.max(0, weeklyLoadIncreaseLimit - 2);
  }

  // Encontrar exercício de técnica relacionado
  const techniqueExercise = await Exercise.findOne({
    muscleGroups: { $in: exercise.muscleGroups },
    difficultyLevel: { $lt: exercise.difficultyLevel },
  }).sort({ difficultyLevel: -1 });

  const prescription = await Prescription.create({
    userId,
    exerciseId,
    recommendedReps,
    recommendedSets,
    frequencyPerWeek,
    durationWeeks,
    weeklyLoadIncreaseLimit,
    techniqueExerciseId: techniqueExercise ? techniqueExercise._id : null,
  });

  return prescription;
}

exports.submitEvaluation = async (req, res) => {
  try {
    const {
      userId, exerciseId, evaluationScore, notes,
    } = req.body;

    const evaluation = await ExecutionEvaluation.create({
      userId,
      exerciseId,
      evaluationScore,
      notes,
    });

    // Gerar prescrição automática
    await generatePrescription(userId, exerciseId, evaluationScore);

    res.status(201).json(evaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ userId: req.params.userId, active: true })
      .populate('exerciseId')
      .populate('techniqueExerciseId');

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
