import React from "react";
import { Link } from "react-router-dom";

export default function TrendsPage() {
  return (
    <div className="mt-main">
      <div className="mt-trends-full">
<Link to="/dashboard" className="back-btn">← Back</Link>

        <h2>Historical Trends (Full View)</h2>

        <img 
          src={`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
            type: "line",
            data: {
              labels: ["1","2","3","4","5","6","7"],
              datasets: [
                { label: "Temperature (°C)", borderColor: "red", data: [36,37,37.5,36.8,37.2,36.5,37.1], fill: false },
                { label: "Heart Rate (bpm)", borderColor: "blue", data: [72,75,78,70,74,76,73], fill: false }
              ]
            }
          }))}`}
          alt="Full Chart"
          className="full-chart-image"
        />
      </div>
    </div>
  );
}
