const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // ID do seu app no Google Cloud

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verifica o token com a API do Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Garante que o token foi emitido para seu app
    });

    const payload = ticket.getPayload(); // Dados do usuário

    req.user = {
      googleId: payload.sub, // ID único do Google
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;