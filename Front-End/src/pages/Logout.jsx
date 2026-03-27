import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  // Logout → redirect to SignIn page
  const handleLogout = () => {
    navigate("/signin"); // replace with your SignIn route
  };

  // Cancel → redirect to Dashboard
  const handleCancel = () => {
    navigate("/dashboard"); // Dashboard
  };

  return (
    <div className="mt-login-page">
      <div className="mt-card">
        <div className="mt-logo">
          <span className="stethoscope-icon">🩺</span>
          <span className="mt-title">MediTwin</span>
        </div>

        <p style={{ textAlign: "center", marginBottom: "30px", color: "#ffffff" }}>
          Are you sure you want to logout?
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
          <button
            className="mt-button"
            style={{ flex: 1, background: "#555" }}
            onClick={handleCancel}
            onMouseOver={e => (e.target.style.background = "#777")}
            onMouseOut={e => (e.target.style.background = "#555")}
          >
            Cancel
          </button>

          <button
            className="mt-button"
            style={{ flex: 1 }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
