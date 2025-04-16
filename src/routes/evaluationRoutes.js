const express = require('express');

const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

router.post('/', evaluationController.submitEvaluation);
router.get('/prescriptions/:userId', evaluationController.getUserPrescriptions);

module.exports = router;
