import React from "react";
import "./MediTwinLogin.css"; // ✅ same styling for consistent theme
import { Link } from "react-router-dom";

export default function MediTwinForgotPassword() {
  return (
    <div className="mt-login-page">
      <div className="mt-card">
        <div className="mt-logo">
          <span className="mt-title">Reset Password</span>
        </div>

        {/* Forgot Password Form */}
        <form className="mt-form" onSubmit={(e) => e.preventDefault()}>
          <p className="mt-info-text">
            Enter your registered email to receive a password reset link.
          </p>
          <input
            className="mt-input"
            type="email"
            placeholder="Email"
            required
          />

          <button className="mt-button" type="submit">
            Send Reset Link
          </button>

          {/* 👇 Navigation options */}
          <p className="mt-register">
            Remember your password? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
