// 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MediTwinSignup.css";

export default function MediTwinSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Signup failed");
        return;
      }

      navigate("/signin"); // redirect to login page

    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="mt-login-page">
      <div className="mt-card">
        <div className="mt-logo">
          <span className="mt-title">Create Account</span>
        </div>

        <form className="mt-form" onSubmit={handleSignup}>
          <input
            className="mt-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="mt-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="mt-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="mt-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="mt-button" type="submit">Sign Up</button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <p className="mt-register">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
