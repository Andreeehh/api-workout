const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const {
      name, age, height, weight, sex,
    } = req.body;
    const newUser = await User.create({
      name, age, height, weight, sex,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
