const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;

    // Valida o token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Aqui você pode criar/salvar o usuário no seu banco de dados
    const userData = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      profilePicture: payload.picture
    };

    // Exemplo: Verifica se o usuário já existe no DB
    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
      user = await User.create(userData); // Cria novo usuário
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.error('Erro no login com Google:', error);
    res.status(401).json({ success: false, message: 'Autenticação falhou' });
  }
});

module.exports = router;