const User = require('../models/userModel');
const admin = require('firebase-admin');

// Inicialize o Firebase Admin SDK (você precisa configurar isso)
const serviceAccount = require('./path-to-your-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verificar o token do Google com o Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Verificar se o usuário já existe
    let user = await User.findOne({ uid });

    if (!user) {
      // Criar novo usuário se não existir
      user = await User.create({
        uid,
        email,
        name,
        profilePicture: picture,
        subscriptionType: 'free'
      });
    } else {
      // Atualizar último login
      user.lastLogin = Date.now();
      await user.save();
    }

    // Aqui você pode gerar um token JWT próprio se quiser
    // ou continuar usando o token do Firebase no frontend

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        subscriptionType: user.subscriptionType
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ success: false, message: 'Autenticação falhou' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};