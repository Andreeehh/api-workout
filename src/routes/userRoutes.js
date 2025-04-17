const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Rotas protegidas
router.get('/:id', authMiddleware, userController.getUser);

module.exports = router;