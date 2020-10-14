import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const [country, setCountry] = useState("Ghana");
  const [weatherInfo, setWeatherInfo] = useState({
    country: "",
    temp: " ",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  // const [weatherNow, setWeatherNow] = useState([]);
  const [loader, setLoader] = useState(null);

  const getWeatherData = (country) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=1b762a27694a99c88c292de5c5793d7d`
      )
      .then((response) => {
        let image;
        setLoader(true);
        setWeatherInfo({
          country: response.data.name,
          temp: Math.round(response.data.main.temp - 273) + "°C",
          description: response.data.weather[0].main,
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

  // Render Loading JSX
  if (loader) {
    return (
      <div>
        <h1 className="form-container" style={{ color: "white" }}>
          Loading...
        </h1>
      </div>
    );
  }
  return (
    <div className="main-container">
      <div className="form-container">
        <div className="login" style={{ marginBottom: "1rem" }}>
          <span style={{ color: "#000" }}>{weatherInfo.country}</span>
          <span style={{ color: "#000" }}>{weatherInfo.temp}</span>
          <span style={{ color: "#000" }}>{weatherInfo.description}</span>
        </div>
        <div className="login">
          <h4 style={{ color: "#000", paddingBottom: "1rem" }}>
            Search Location
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
