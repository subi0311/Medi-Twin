const express = require('express');
const router = express.Router();
const Patient = require('../models/PatientData');

// GET → fetch patients from MongoDB
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// POST → save patient data to MongoDB
router.post('/', async (req, res) => {
  try {
    console.log("📩 Patient data received:", req.body);

    const patient = new Patient(req.body);
    await patient.save(); // 👈 YAHAN collection auto create hoti hai

    res.json({
      msg: "✅ Patient data saved in MongoDB",
      data: patient
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
