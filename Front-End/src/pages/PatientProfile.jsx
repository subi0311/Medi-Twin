import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientProfile() {
  const navigate = useNavigate();

  // Placeholder patient data
  const [patientInfo] = useState({
    name: "John Doe",
    age: 35,
    gender: "Male",
    patientID: "PT12345",
    contact: "+92 300 1234567",
  });

  const [latestVitals] = useState({
    temperature: 37.2,
    heartRate: 75,
  });

  const [uploadedFiles] = useState([
    { name: "Blood_Report.pdf" },
    { name: "XRay_Image.jpg" },
    { name: "Prescription.pdf" },
  ]);

  return (
    <div className="mt-login-page">
      <div className="mt-card">
        {/* Logo */}
        <div className="mt-logo">
          <span className="stethoscope-icon">🩺</span>
          <span className="mt-title">MediTwin</span>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>
          Patient Profile
        </h2>

        {/* Patient Info */}
        <div style={{ marginBottom: "20px" }}>
          <p><strong>Name:</strong> {patientInfo.name}</p>
          <p><strong>Age:</strong> {patientInfo.age}</p>
          <p><strong>Gender:</strong> {patientInfo.gender}</p>
          <p><strong>Patient ID:</strong> {patientInfo.patientID}</p>
          <p><strong>Contact:</strong> {patientInfo.contact}</p>
        </div>

        {/* Latest Vitals */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#fff" }}>Latest Vitals</h3>
          <p>🌡️ Temperature: {latestVitals.temperature} °C</p>
          <p>💓 Heart Rate: {latestVitals.heartRate} bpm</p>
        </div>

        {/* Uploaded Files / Medical History */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#fff" }}>Medical History</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{file.name}</span>
                <button
                  className="mt-button"
                  style={{ padding: "6px 12px", fontSize: "14px" }}
                  onClick={() => alert("File view placeholder")}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Back Button */}
        <button
          className="mt-button"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
