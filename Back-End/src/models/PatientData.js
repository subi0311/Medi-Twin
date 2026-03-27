const mongoose = require('mongoose');
const PatientDataSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deviceId: String,
  heartRate: Number,
  temperature: Number,
  spo2: Number,
  systolic: Number,
  diastolic: Number,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('PatientData', PatientDataSchema);
