const Train = require('../models/TrainModel');

exports.addTrain = async (req, res) => {
    try {
        const { name, source, destination, available_seats } = req.body;

        await Train.create({ name, source, destination, available_seats });

        res.status(201).json({ message: 'Train added successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSeatsForTrain = async (req, res) => {
    try {
        const trainId = req.params.train_id;
        const [rows] = await Train.findSeatsByTrainId(trainId);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }

        res.status(200).json({Available_Seats : rows.available_seats});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTrains = async (req, res) => {
    try {
        const rows = await Train.findAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTrain = async (req, res) => {
    try {
        const {id} = req.params;
        const { available_seats } = req.body;

        if (!id || available_seats === undefined) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const result = await Train.update(id, available_seats);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }

        res.status(200).json({ message: 'Train updated successfully!' });
    } catch (error) {
        console.error('Error updating train:', error);
        res.status(500).json({ message: error.message });
    }
};
