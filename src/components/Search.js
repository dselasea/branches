import React, { useState } from "react";

function Search({ getWeatherData, country, time, temp, description, icon }) {
  const [countries, setCountries] = useState("");

  function getInput(e) {
    setCountries(e.target.value);
    e.preventDefault();
  }

  return (
    <React.Fragment>
      <div className="search">
        <div className="search-display">
          <span>{country}</span>
          <span>{time}</span>
          <span>{temp}</span>
          <span>{description}</span>
          <span>{icon}</span>
        </div>
        <div className="search-container">
          <h4 style={{ color: "#000", paddingBottom: "1rem" }}>
            Enter Location
          </h4>
          <input
            type="text"
            placeholder="Search Country"
            value={countries}
            onChange={getInput}
          />
          {countries === "" ? (
            <p style={{ color: "#000" }}>Please enter a country</p>
          ) : null}
          <button
            onClick={() => {
              getWeatherData(countries);
            }}
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Search;
