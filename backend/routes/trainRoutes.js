const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware,adminMiddleware, trainController.addTrain);

router.get('/:train_id/seats', trainController.getSeatsForTrain);

router.get('/all', authMiddleware,adminMiddleware, trainController.getAllTrains);

router.put('/update/:id', authMiddleware,adminMiddleware, trainController.updateTrain);

module.exports = router;
