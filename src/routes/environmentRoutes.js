const express = require('express');

const router = express.Router();
const environmentController = require('../controllers/environmentController');

router.post('/', environmentController.setUserEnvironment);
router.get('/:userId', environmentController.getUserEnvironment);

module.exports = router;
