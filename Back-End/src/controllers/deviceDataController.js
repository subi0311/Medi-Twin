// const DeviceData = require("../models/DeviceData");

// exports.addDeviceData = async (req, res) => {
//   try {
//     const {
//       deviceId,
//       temperature,
//       heartRate,
//       spo2,
//       steps
//     } = req.body;

//     const savedData = await DeviceData.create({
//       deviceId,
//       temperature,
//       heartRate,
//       spo2,
//       steps
//     });

//     res.status(201).json(savedData);
//   } catch (error) {
//     console.error(" Error saving device data:", error);
//     res.status(500).json({ message: "Failed to save device data" });
//   }
// };

// /*
//   Frontend → Backend
//   yeh function MongoDB se LATEST sensor data bhejega
// */
// exports.getLatestDeviceData = async (req, res) => {
//   try {
//     const latestData = await DeviceData
//       .findOne()
//       .sort({ createdAt: -1 }); // latest record

//     if (!latestData) {
//       return res.status(404).json({ message: "No device data found" });
//     }

//     res.json(latestData);
//   } catch (error) {
//     console.error(" Error fetching latest data:", error);
//     res.status(500).json({ message: "Failed to fetch latest data" });
//   }
// };

const DeviceData = require("../models/DeviceData");

exports.addDeviceData = async (req, res) => {
  try {
    const { deviceId, temperature, heartRate, spo2, steps } = req.body;

    if (!deviceId) {
      return res.status(400).json({ message: "Device ID is required" });
    }

    const savedData = await DeviceData.create({
      deviceId,
      temperature,
      heartRate,
      spo2,
      steps
    });

    res.status(201).json({
      message: "Device data saved successfully",
      data: savedData
    });

  } catch (error) {
    console.error("Error saving device data:", error);
    res.status(500).json({ message: "Failed to save device data" });
  }
};

exports.getLatestDeviceData = async (req, res) => {
  try {
    const latestData = await DeviceData
      .findOne()
      .sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({ message: "No device data found" });
    }

    res.status(200).json(latestData);

  } catch (error) {
    console.error("Error fetching latest data:", error);
    res.status(500).json({ message: "Failed to fetch latest data" });
  }
};
