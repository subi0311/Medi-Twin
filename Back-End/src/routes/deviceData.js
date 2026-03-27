// const express = require("express");
// const router = express.Router();

// const {
//   addDeviceData,
//   getLatestDeviceData
// } = require("../controllers/deviceDataController");

// // Arduino → backend (POST)
// router.post("/add", addDeviceData);

// // Frontend → backend (GET latest data)
// router.get("/latest", getLatestDeviceData);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  addDeviceData,
  getLatestDeviceData
} = require("../controllers/deviceDataController");

router.post("/add", addDeviceData);
router.get("/latest", getLatestDeviceData);

module.exports = router;
