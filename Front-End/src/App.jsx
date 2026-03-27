import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MediTwinLogin from "./components/MediTwinLogin";
import MediTwinSignup from "./components/MediTwinSignup";
import MediTwinForgotPassword from "./components/MediTwinForgotPassword";
import Dashboard from "./Dashboard";
import Records from "./pages/Records";
import PatientProfile from "./pages/PatientProfile";
import TrendsPage from "./TrendsPage";
import Logout from "./pages/Logout";


function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<MediTwinLogin />} />
        <Route path="/signin" element={<MediTwinLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<MediTwinSignup />} />
        <Route path="/forgot-password" element={<MediTwinForgotPassword />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/records" element={<Records />} />
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/logout" element={<Logout />} /> 
      </Routes>
    </Router>
  );
}

export default App;
