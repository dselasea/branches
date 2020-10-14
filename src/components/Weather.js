import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const [country, setCountry] = useState("Ghana");
  const [weatherInfo, setWeatherInfo] = useState({
    country: "",
    temp: " ",
    description: "",
    icon: "",
  });
  // const [weatherNow, setWeatherNow] = useState([]);
  const [loader, setLoader] = useState(false);

  const getWeatherData = (country) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=1b762a27694a99c88c292de5c5793d7d`
      )
      .then((response) => {
        console.log(response.data);
        setWeatherInfo({
          country: response.data.name,
          temp: Math.round(response.data.main.temp - 273),
          description: response.data.weather[0].main,
          icon: response.data.weather[0].icon,
        });
      })
      .catch((error) => {
        console.log(error);
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
        <div
          style={{ color: "white", padding: " 1.2rem 0", textAlign: "center" }}
        >
          <span className="display">{country}</span>
          {/*<span className="display">{condition}</span>
          <span className="display" style={{ textTransform: "capitalize" }}>
            {main}
  </span>*/}
        </div>
        <div className="login" style={{ marginBottom: "1rem" }}>
          <h3 style={{ color: "#000" }}>{weatherInfo.country}</h3>
          <h3 style={{ color: "#000" }}>{weatherInfo.temp}</h3>
          <h3 style={{ color: "#000" }}>{weatherInfo.description}</h3>
          <h3 style={{ color: "#000" }}>{weatherInfo.icon}</h3>
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
      </div>
    </div>
  );
}

export default Weather;
