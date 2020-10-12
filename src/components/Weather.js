import React, { useState, useEffect } from "react";

function Weather() {
  const [weather, setWeather] = useState({
    location: "",
    city: "",
    condition: "",
    icon: "https://cdn.weatherapi.com/weather/64x64/night/116.png",
  });
  const location = weather.location;
  const city = weather.city;
  const condition = weather.condition;
  const icon = weather.icon;
  const [searchInput, setSearchInput] = useState("ghana");
  const [weatherNow, setWeatherNow] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=1b762a27694a99c88c292de5c5793d7d`
    )
      .then((response) => {
        if(response.status >= 200 && response.status <= 299){
          
          return response.json()
        }else{
          // setLoader(false);
          throw new Error(response.statusText)
        }
      })
      .then((data) => {
        console.log(data)
        setWeatherNow(data);
        setLoader(false);
      })
      .catch(err => {console.log("Error Loading Data")
      });
  }, [searchInput]);


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
          icon: weatherNow.weather[0]["icon"],
        };
      });
      // setLoader(true);
    }
    e.preventDefault();
  }


  if(loader){
    return <div><h1>Loading...</h1></div>
  }
  if(isError){
    return <div><h1 style={{color: "black"}}>Error In Fetchin Data</h1></div>
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
          />
        </form>
        {searchInput === "" ? <p>Please enter a country</p> : null}
        <button onClick={getWeatherInfo}>Search</button>
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
      </div>
    </div>
  );
}

export default Weather;
