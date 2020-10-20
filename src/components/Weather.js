import React, { useState, useEffect } from "react";

function Weather(props) {
  const [showData, setShowData] = useState(false);

  return (
    <div className="main-container">
      <div className="form-container">
        {showData && (
          <div className="screen" style={{ marginBottom: "1rem" }}>
            <span style={{ color: "#000" }}>{weatherInfo.country}</span>
            <span style={{ color: "#000" }}>{weatherInfo.time}</span>
            <span style={{ color: "#000", fontSize: "2rem" }}>
              {weatherInfo.temp}
            </span>
            <span style={{ color: "#000" }}>{weatherInfo.description}</span>
            <span>{weatherInfo.icon}</span>
          </div>
        )}

        <p style={{ marginTop: "1rem" }}>
          App by{" "}
          <a href="https://github.com/dselasea" target="_blank">
            Daniel Selase
          </a>
        </p>
      </div>
    </div>
  );
}

export default Weather;
