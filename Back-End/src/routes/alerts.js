const express = require('express');
const Alert = require('../models/Alert');
const auth = require('../middleware/auth');
const router = express.Router();

// GET alerts by patient ID
router.get('/:patientId', auth, async (req, res) => {
  try {
    const pid = req.params.patientId;

    if (req.user.role === 'patient' && req.user.id !== pid) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const alerts = await Alert.find({ patient: pid })
      .sort({ createdAt: -1 });

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
