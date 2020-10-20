import React, { useState, useEffect } from "react";
import axios from "axios";
import "./components/Login.css";
import Login from "./components/Login";
import History from "./components/History";
import Search from "./components/Search";

function App() {
  // Logged In state set to false
  const [log, setLog] = useState(false);
  const [countryHistory, setCountryHistory] = useState([]);

  // Weather display constants
  const [weatherInfo, setWeatherInfo] = useState({
    country: "",
    time: "",
    temp: " ",
    description: "",
    icon: "",
  });

  // Function to check if user is logged In or not
  function loggedIn(logIn) {
    setLog(logIn);
  }

  // Function that fetches weather data with axios
  const getWeatherData = (country) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=099bdfffb39d0176baa0280ff5067ec0&query=${country}`
      )
      .then((response) => {
        setWeatherInfo({
          country: response.data.location.name,
          time: response.data.current.observation_time,
          temp: response.data.current.temperature + " °C",
          description: response.data.current.weather_descriptions,
          icon: <img src={response.data.current.weather_icons} />,
        });

        if (log) {
          const count = { country };
          setCountryHistory((countryHistory) => {
            return [...countryHistory, count];
          });
        } else {
          return false;
        }
      })
      .catch((error) => {
        // setErrorMessage("Error Loading Data...");
      });
  };

  return (
    <div className="main-container">
      <div className="container">
        <Search
          country={weatherInfo.country}
          time={weatherInfo.time}
          temp={weatherInfo.temp}
          description={weatherInfo.description}
          icon={weatherInfo.icon}
          getWeatherData={getWeatherData}
        />
        {log === false ? (
          <Login setLog={loggedIn} />
        ) : (
          <History setLog={loggedIn} history={countryHistory} />
        )}
      </div>
    </div>
  );
}

export default App;
