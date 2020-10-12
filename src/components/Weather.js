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
  const [searchInput, setSearchInput] = useState("");
  const [weatherNow, setWeatherNow] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=3865367567c643ad88e11112200910&q=${searchInput}`
    )
      .then((response) => {
        if(response.status >= 200 && response.status <= 299){
          response.json();
        }else{
          setLoader(false);
          setIsError(true);
          throw new Error(response.statusText)
        }
      })
      .then((data) => {
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
          location: weatherNow.location.country,
          city: weatherNow.location.name,
          condition: weatherNow.current.condition["text"],
          icon: weatherNow.current.condition["icon"],
        };
      });
      // setLoader(true);
    }
    e.preventDefault();
  }

  function callData(){
    setTimeout(getWeatherInfo, 3000);
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
        <button onClick={callData}>Search</button>
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
