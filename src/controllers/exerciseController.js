const Exercise = require('../models/exerciseModel');

exports.getExercises = async (req, res) => {
  try {
    const { environment, equipment } = req.query;

    const query = {};

    if (environment) {
      query.suitableEnvironments = environment;
    }

    if (equipment) {
      query.requiredEquipment = { $in: equipment.split(',') };
    }

    const exercises = await Exercise.find(query);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExerciseDetails = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercício não encontrado' });
    }
    return res.status(200).json(exercise);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
