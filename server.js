require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rotas
const userRoutes = require('./src/routes/userRoutes');
const environmentRoutes = require('./src/routes/environmentRoutes');
const evaluationRoutes = require('./src/routes/evaluationRoutes');
const exerciseRoutes = require('./src/routes/exerciseRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Importar middleware
const authMiddleware = require('./src/middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rota inicial pública
app.get('/', (req, res) => {
  res.send('API do App de Treinos está funcionando!');
});

// Rotas públicas (sem autenticação)
app.use('/auth', authRoutes);

// Rotas protegidas (com autenticação)
app.use('/users', authMiddleware, userRoutes);
app.use('/environments', authMiddleware, environmentRoutes);
app.use('/evaluations', authMiddleware, evaluationRoutes);
app.use('/exercises', exerciseRoutes); // Pode deixar públicas algumas rotas de exercícios se necessário

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});