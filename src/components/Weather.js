import React, { useState, useEffect } from "react";

function Weather() {
  const [weather, setWeather] = useState({
    location: "",
    city: "",
    condition: "",
    icon: "",
  });
  const { location, city, condition, icon } = weather;
  const [searchInput, setSearchInput] = useState("");
  const [weatherNow, setWeatherNow] = useState([]);
  const [loader, setLoader] = useState(true);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=1b762a27694a99c88c292de5c5793d7d`
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          setLoader(false);
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherNow(data);
        setLoader(false);
      })
      .catch((err) => {
        console.log("Error Loading Data");
      });
  }, [searchInput]);

  // Get Weather Information from search input
  function getWeatherInfo(e) {
    if (searchInput === "") {
      console.log("Empty");
    } else {
      setWeather((prevState) => {
        return {
          ...prevState,
          location: weatherNow.sys.country,
          city: weatherNow.name,
          condition: weatherNow.weather[0]["main"],
          icon:
            "http://openweathermap.org/img/w/" +
            weatherNow.weather[0]["icon"] +
            ".png",
        };
      });
    }
    // Store Country
    const countryList = { country: searchInput };
    if (country.length < 5) {
      setCountry((country) => {
        return [...country, countryList];
      });
    } else {
      return false;
    }
    e.preventDefault();
  }

  // Render Loading JSX
  if (loader) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Weather App</h1>
      <div className="weather-content">
        <form>
          <input
            type="text"
            placeholder="Search Country"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoComplete="off"
          />
        </form>
        {searchInput === "" ? <p>Please enter a country</p> : null}
        <button onClick={getWeatherInfo} type="submit">
          Search
        </button>
        <div className="weather-info">
          <div>
            <p>
              Country: <span>{location}</span>
            </p>
            <p>
              City: <span>{city}</span>
            </p>
            <p>
              Condition: <span>{condition}</span>
            </p>
            <img src={icon} alt="weather icon" />
          </div>
        </div>
        {country.map((count, index) => {
          return (
            <div key={index}>
              <p>{count.country}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Weather;
