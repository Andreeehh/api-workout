const express = require('express');

const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/user/:userId', exerciseController.getExercises);
router.get('/:id', exerciseController.getExerciseDetails);

module.exports = router;
