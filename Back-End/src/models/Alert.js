const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

router.post('/', async (req, res) => {
  try {
    const newAlert = new Alert(req.body); 
    const savedAlert = await newAlert.save(); 
    res.status(201).json(savedAlert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


