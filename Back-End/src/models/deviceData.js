// const mongoose = require('mongoose');

// const deviceDataSchema = new mongoose.Schema({
//   deviceId: { type: String, required: true },
//   temperature: { type: Number, required: true },
//   heartRate: { type: Number, required: true },
//   spo2: { type: Number, required: true },
//   steps: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// // ✅ Correct export
// module.exports = mongoose.model('DeviceData', deviceDataSchema);


const mongoose = require("mongoose");

const deviceDataSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true
    },
    temperature: {
      type: Number,
      required: true
    },
    heartRate: {
      type: Number,
      required: true
    },
    spo2: {
      type: Number,
      required: true
    },
    steps: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true   // 🔥 VERY IMPORTANT
  }
);

module.exports = mongoose.model("DeviceData", deviceDataSchema);
