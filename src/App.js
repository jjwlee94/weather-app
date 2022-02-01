import React, { useState } from "react";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };

  return (
    <div className="app">
      <main>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter a City"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button onClick={search}>Search</button>
        </div>
      </main>
    </div>
  );
};

export default App;
