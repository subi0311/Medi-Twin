// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./MediTwinLogin.css";

// export default function MediTwinLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Frontend-only login: any email/password will redirect
//     if (email && password) {
//       navigate("/dashboard"); // Redirect to Dashboard page
//     } else {
//       alert("Please enter email and password");
//     }
//   };

//   return (
//     <div className="mt-login-page">
//       <div className="mt-card">
//         <div className="mt-logo">
//           <span className="stethoscope-icon" role="img" aria-label="stethoscope">
//             🩺
//           </span>
//           <span className="mt-title">MediTwin</span>
//         </div>

//         <form className="mt-form" onSubmit={handleSubmit}>
//           <input
//             className="mt-input"
//             type="email"
//             placeholder="Email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             className="mt-input"
//             type="password"
//             placeholder="Password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <div className="mt-row">
//             <Link className="mt-forgot" to="/forgot-password">
//               Forgot Password?
//             </Link>
//           </div>

//           <button className="mt-button" type="submit">Sign In</button>

//           <p className="mt-register">
//             Not Yet Registered? <Link to="/signup">Sign Up</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import "./MediTwinLogin.css";

export default function MediTwinLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error on new submit

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Invalid credentials"); // show backend error
        return;
      }

      // ✅ Login successful
      localStorage.setItem("token", data.token); // save JWT token
      localStorage.setItem("userRole", data.role); // optional
      localStorage.setItem("userId", data.userId); // optional

      navigate("/dashboard"); // redirect to dashboard

    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="mt-login-page">
      <div className="mt-card">
        <div className="mt-logo">
          <span className="stethoscope-icon" role="img" aria-label="stethoscope">
            🩺
          </span>
          <span className="mt-title">MediTwin</span>
        </div>

        <form className="mt-form" onSubmit={handleSubmit}>
          <input
            className="mt-input"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mt-input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-row">
            <Link className="mt-forgot" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button className="mt-button" type="submit">Sign In</button>

          {/* ✅ Error display */}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <p className="mt-register">
            Not Yet Registered? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
