import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiFileText,
  FiUploadCloud,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

export default function Records({ liveData }) {
  // liveData prop: dashboard se aa rahi live sensor & chart info
  // Agar backend nahi, to ye default sample data show karega
  const [records, setRecords] = useState([
    {
      date: "2025-11-16 10:30",
      temperature: 36.8,
      heartRate: 72,
      chartUrl: "https://quickchart.io/chart?c={}" // placeholder
    },
  ]);

  // Update records whenever liveData changes
  useEffect(() => {
    if (liveData) {
      const newRecord = {
        date: new Date().toLocaleString(),
        temperature: liveData.temperature,
        heartRate: liveData.heartRate,
        chartUrl: liveData.chartUrl,
      };
      setRecords(prev => [newRecord, ...prev]);
    }
  }, [liveData]);

  return (
    <div className="mt-dashboard">
      {/* Sidebar */}
      <aside className="mt-sidebar">
        <div className="mt-logo-wrapper">
          <h2 className="mt-logo">🩺 MediTwin</h2>
          <div className="mt-id-icon">
            <Link to="/profile">
              <FiUser />
            </Link>
          </div>
        </div>
        <nav>
          <Link to="/dashboard" className="">
            <FiMapPin /> Dashboard
          </Link>
          <Link to="/records" className="active">
            <FiFileText /> Records
          </Link>
          <Link to="/logout">
            <FiLogOut /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="mt-main">
        <section className="mt-body-section">
          <h2 style={{ color: "white", marginBottom: "20px" }}>Patient Records</h2>

          <div className="records-table-wrapper" style={{ overflowX: "auto" }}>
            <table
              className="records-table"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid white" }}>
                  <th style={{ color: "white", padding: "8px", textAlign: "left" }}>Date/Time</th>
                  <th style={{ color: "white", padding: "8px", textAlign: "left" }}>Temperature (°C)</th>
                  <th style={{ color: "white", padding: "8px", textAlign: "left" }}>Heart Rate (bpm)</th>
                  <th style={{ color: "white", padding: "8px", textAlign: "left" }}>Historical Trend</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #555",
                      backgroundColor: index % 2 === 0 ? "#1f1f1f" : "#2a2a2a",
                    }}
                  >
                    <td style={{ color: "white", padding: "8px" }}>{record.date}</td>
                    <td style={{ color: "white", padding: "8px" }}>{record.temperature}</td>
                    <td style={{ color: "white", padding: "8px" }}>{record.heartRate}</td>
                    <td style={{ color: "white", padding: "8px" }}>
                      {record.chartUrl ? (
                        <a
                          href={record.chartUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#4da6ff" }}
                        >
                          View Chart
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
