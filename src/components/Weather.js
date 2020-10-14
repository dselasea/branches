import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const [country, setCountry] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({
    country: "",
    time: "",
    temp: " ",
    description: "",
    icon: "",
  });
  const [showData, setShowData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [weatherNow, setWeatherNow] = useState([]);
  const [loader, setLoader] = useState(null);

  const getWeatherData = (country) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=099bdfffb39d0176baa0280ff5067ec0&query=${country}`
      )
      .then((response) => {
        setShowData(true);
        setWeatherInfo({
          country: response.data.location.name,
          time: response.data.current.observation_time,
          temp: response.data.current.temperature + " °C",
          description: response.data.current.weather_descriptions,
          icon: <img src={response.data.current.weather_icons} />,
        });
        setLoader(false);
      })
      .catch((error) => {
        setErrorMessage("Error Loading Data...");
      });
  };

  function getInput(e) {
    setCountry(e.target.value);
    e.preventDefault();
  }

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
        <div className="login">
          <h4 style={{ color: "#000", paddingBottom: "1rem" }}>
            Enter Location
          </h4>
          <input
            type="text"
            placeholder="Search Country"
            value={country}
            onChange={getInput}
          />
          {country === "" ? (
            <p style={{ color: "#000" }}>Please enter a country</p>
          ) : null}
          <button
            onClick={() => {
              getWeatherData(country);
            }}
            type="submit"
          >
            Search
          </button>
        </div>
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
