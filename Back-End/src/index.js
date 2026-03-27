const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const alertRoutes = require("./routes/alerts");
const authRoutes = require("./routes/auth");
const patientDataRoutes = require("./routes/patientData");
const deviceDataRoutes = require("./routes/deviceData");

app.use("/api/v1/alerts", alertRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/patientData", patientDataRoutes);
app.use("/api/v1/deviceData", deviceDataRoutes);


const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) =>
    console.error(" MongoDB connection error:", err)
  );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

