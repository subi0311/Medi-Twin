
// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";
// import { Link } from "react-router-dom";
// import { FiMapPin, FiFileText, FiLogOut, FiUser } from "react-icons/fi";

// export default function Dashboard() {
//   const [data, setData] = useState({
//     temperature: "--",
//     heartRate: "--",
//     spo2: "--",
//     steps: "--",
//   });

//   const [chartUrl, setChartUrl] = useState("");

//   // 🔹 Sensor history buffers
//   const [tempHistory, setTempHistory] = useState([]);
//   const [heartHistory, setHeartHistory] = useState([]);
//   const [spo2History, setSpo2History] = useState([]);

//   // 🔹 Fetch latest sensor data every 3 seconds
//   useEffect(() => {
//     const fetchSensorData = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/v1/deviceData/latest");
//         const result = await res.json();

//         // 🔹 Update live sensor data
//         setData({
//           temperature: result.temperature ?? "--",
//           heartRate: result.heartRate ?? "--",
//           spo2: result.spo2 ?? "--",
//           steps: result.steps ?? "--",
//         });

//         // 🔹 Update history buffers (last 10 readings)
//         setTempHistory((prev) => [...prev, result.temperature ?? 0].slice(-10));
//         setHeartHistory((prev) => [...prev, result.heartRate ?? 0].slice(-10));
//         setSpo2History((prev) => [...prev, result.spo2 ?? 0].slice(-10));
//       } catch (error) {
//         console.error("Sensor API Error:", error);
//       }
//     };

//     fetchSensorData();
//     const interval = setInterval(fetchSensorData, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // 🔹 Update chart URL whenever history or current sensor data changes
//   useEffect(() => {
//     if (tempHistory.length === 0) return;

//     const chartConfig = {
//       type: "line",
//       data: {
//         labels: tempHistory.map((_, i) => i + 1),
//         datasets: [
//           {
//             label: "Temperature (°C)",
//             borderColor: data.temperature > 37.5 ? "red" : "orange",
//             data: tempHistory,
//             fill: false,
//           },
//           {
//             label: "Heart Rate (bpm)",
//             borderColor: data.heartRate > 100 ? "red" : "blue",
//             data: heartHistory,
//             fill: false,
//           },
//           {
//             label: "SpO₂ (%)",
//             borderColor: data.spo2 < 95 ? "red" : "green",
//             data: spo2History,
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         animation: false, // 🔹 smooth realtime update without flicker
//         scales: {
//           y: { beginAtZero: true },
//         },
//       },
//     };

//     setChartUrl(`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`);
//   }, [tempHistory, heartHistory, spo2History, data.temperature, data.heartRate, data.spo2]);

//   const handleFileUpload = (e) => {
//     if (e.target.files.length > 0) {
//       alert(`File Uploaded: ${e.target.files[0].name}`);
//     }
//   };

//   // 🔔 Medical thresholds
//   const isTempAbnormal = data.temperature !== "--" && (data.temperature < 36.5 || data.temperature > 37.5);
//   const isHeartAbnormal = data.heartRate !== "--" && (data.heartRate < 60 || data.heartRate > 100);

//   return (
//     <div className="mt-dashboard">
//       <aside className="mt-sidebar">
//         <div className="mt-logo-wrapper">
//           <h2 className="mt-logo">🩺 MediTwin</h2>
//           <div className="mt-id-icon">
//             <Link to="/profile">
//               <FiUser />
//             </Link>
//           </div>
//         </div>

//         <nav>
//           <Link to="/dashboard" className="active">
//             <FiMapPin /> Dashboard
//           </Link>
//           <Link to="/records">
//             <FiFileText /> Records
//           </Link>
//           <Link to="/logout">
//             <FiLogOut /> Logout
//           </Link>
//         </nav>
//       </aside>

//       <main className="mt-main">
//         <section className="mt-body-section">
//           <div className="mt-human-model-wrapper">
//             <img
//               src="images/Human_Body.png"
//               alt="Human Body"
//               className="human-image"
//             />

//             <div
//               className={`sensor-dot ${isTempAbnormal ? "blink" : ""}`}
//               style={{ top: "10%", left: "50%" }}
//               title="Temperature"
//             />

//             <div
//               className={`sensor-dot ${isHeartAbnormal ? "blink" : ""}`}
//               style={{ top: "33%", left: "48%" }}
//               title="Heart Rate"
//             />
//           </div>

//           <div className="mt-live-sensor">
//             <h2>Live Sensor</h2>
//             <ul>
//               <li>🌡️ Temperature: {data.temperature} °C</li>
//               <li>💓 Heart Rate: {data.heartRate} bpm</li>
//               <li>🫁 SpO₂: {data.spo2} %</li>
//               <li>👣 Steps: {data.steps}</li>
//             </ul>
//           </div>
//         </section>

//         <section className="mt-bottom-section">
//           <div className="mt-trends">
//             <h2>Real Time Trends</h2>
//             {chartUrl && <img src={chartUrl} alt="Chart" />}
//           </div>

//           <div className="mt-files">
//             <h2>Patient Files</h2>
//             <input
//               type="file"
//               id="fileInput"
//               style={{ display: "none" }}
//               onChange={handleFileUpload}
//             />
//             <button
//               className="mt-upload-btn"
//               onClick={() => document.getElementById("fileInput").click()}
//             >
//               Upload
//             </button>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { FiMapPin, FiFileText, FiLogOut, FiUser } from "react-icons/fi";

export default function Dashboard() {

  const [data, setData] = useState({
    temperature: "--",
    heartRate: "--",
    spo2: "--",
    steps: "--",
  });

  // 🔴 Demo Patients
  const demoPatients = [
    { temperature: 37.1, heartRate: 78, spo2: 98, steps: 210 },
    { temperature: 38.3, heartRate: 110, spo2: 94, steps: 350 },
    { temperature: 36.7, heartRate: 72, spo2: 99, steps: 150 },
  ];

  const [chartUrl, setChartUrl] = useState("");

  const [tempHistory, setTempHistory] = useState([]);
  const [heartHistory, setHeartHistory] = useState([]);
  const [spo2History, setSpo2History] = useState([]);

  // 🔹 Fetch LIVE sensor data
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/deviceData/latest");
        const result = await res.json();

        setData({
          temperature: result.temperature ?? "--",
          heartRate: result.heartRate ?? "--",
          spo2: result.spo2 ?? "--",
          steps: result.steps ?? "--",
        });

        setTempHistory((prev) => [...prev, result.temperature ?? 0].slice(-10));
        setHeartHistory((prev) => [...prev, result.heartRate ?? 0].slice(-10));
        setSpo2History((prev) => [...prev, result.spo2 ?? 0].slice(-10));
      } catch (error) {
        console.error("Sensor API Error:", error);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Chart Generator
  useEffect(() => {
    if (tempHistory.length === 0) return;

    const chartConfig = {
      type: "line",
      data: {
        labels: tempHistory.map((_, i) => i + 1),
        datasets: [
          {
            label: "Temperature (°C)",
            borderColor: "red",
            data: tempHistory,
            fill: false,
          },
          {
            label: "Heart Rate (bpm)",
            borderColor: "blue",
            data: heartHistory,
            fill: false,
          },
          {
            label: "SpO₂ (%)",
            borderColor: "green",
            data: spo2History,
            fill: false,
          },
        ],
      },
    };

    setChartUrl(
      `https://quickchart.io/chart?c=${encodeURIComponent(
        JSON.stringify(chartConfig)
      )}`
    );
  }, [tempHistory, heartHistory, spo2History]);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      alert(`File Uploaded: ${e.target.files[0].name}`);
    }
  };

  // 🔔 Thresholds only for LIVE
  const isTempAbnormal =
    data.temperature !== "--" &&
    (data.temperature < 36.5 || data.temperature > 37.5);

  const isHeartAbnormal =
    data.heartRate !== "--" &&
    (data.heartRate < 60 || data.heartRate > 100);

  const patients = [
    { name: "Patient 1", data, live: true },
    { name: "Patient 2", data: demoPatients[0] },
    { name: "Patient 3", data: demoPatients[1] },
    { name: "Patient 4", data: demoPatients[2] },
  ];

  return (
    <div className="mt-dashboard">
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
          <Link to="/dashboard" className="active">
            <FiMapPin /> Dashboard
          </Link>
          <Link to="/records">
            <FiFileText /> Records
          </Link>
          <Link to="/logout">
            <FiLogOut /> Logout
          </Link>
        </nav>
      </aside>

      <main className="mt-main">

        {/* BODY GRID */}
        <section className="mt-body-section">

          <div className="mt-human-grid">
  {patients.map((p, i) => {

    const demoBlink = i === 2; // 🔥 ONLY Patient 3 blink

    return (
      <div className="mt-human-model-wrapper" key={i}>

        <div className="patient-label">
          {p.name} {p.live && <span className="live-dot">LIVE</span>}
        </div>

        <img
          src="images/Human_Body.png"
          alt={p.name}
          className="human-image"
        />

        <div
          className={`sensor-dot ${
            (p.live && isTempAbnormal) || demoBlink ? "blink" : ""
          }`}
          style={{ top: "10%", left: "50%" }}
        />

        <div
          className={`sensor-dot ${
            (p.live && isHeartAbnormal) || demoBlink ? "blink" : ""
          }`}
          style={{ top: "33%", left: "48%" }}
        />
      </div>
    );
  })}
</div>


          {/* LIVE PANEL */}
          <div className="mt-live-sensor">
            <h2>Live Sensor</h2>
            <ul>
              <li>🌡️ Temperature: {data.temperature} °C</li>
              <li>💓 Heart Rate: {data.heartRate} bpm</li>
              <li>🫁 SpO₂: {data.spo2} %</li>
              <li>👣 Steps: {data.steps}</li>
            </ul>
          </div>

        </section>

        {/* BOTTOM SECTION */}
        <section className="mt-bottom-section">
          <div className="mt-trends">
            <h2>Real Time Trends</h2>
            {chartUrl && <img src={chartUrl} alt="Chart" />}
          </div>

          <div className="mt-files">
            <h2>Patient Files</h2>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <button
              className="mt-upload-btn"
              onClick={() =>
                document.getElementById("fileInput").click()
              }
            >
              Upload
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}