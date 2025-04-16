const TrainingEnvironment = require('../models/trainingEnvironmentModel');

exports.setUserEnvironment = async (req, res) => {
  try {
    const { userId, environmentType, equipment } = req.body;

    // Verifica se já existe um ambiente para o usuário
    const existingEnv = await TrainingEnvironment.findOne({ userId });

    if (existingEnv) {
      existingEnv.environmentType = environmentType;
      existingEnv.equipment = equipment;
      existingEnv.updatedAt = Date.now();
      await existingEnv.save();
      return res.status(200).json(existingEnv);
    }

    const newEnvironment = await TrainingEnvironment.create({
      userId,
      environmentType,
      equipment,
    });

    return res.status(201).json(newEnvironment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getUserEnvironment = async (req, res) => {
  try {
    const environment = await TrainingEnvironment.findOne({ userId: req.params.userId });
    if (!environment) {
      return res.status(404).json({ message: 'Ambiente de treino não encontrado' });
    }
    return res.status(200).json(environment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
