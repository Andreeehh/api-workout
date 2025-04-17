const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastro tradicional
exports.signup = async (req, res) => {
  try {
    const { name, email, password, age, height, weight, sex } = req.body;
    
    // Verifica se email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      height,
      weight,
      sex,
      subscriptionType: 'free'
    });

    // Remove a senha do retorno
    newUser.password = undefined;

    // Gera token JWT
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      user: newUser,
      token,
      expiresIn: 86400 // 1 dia em segundos
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login tradicional
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verifica senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Remove senha do objeto user
    user.password = undefined;

    // Gera token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      user,
      token,
      expiresIn: 86400
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
