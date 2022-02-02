import React, { useState } from "react";
import "./App.css";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const search = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setCity("");
        console.log(result);
      });
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main === ("rain" || "shower rain" || "thunderstorm")
            ? "app rain"
            : weather.main === "snow"
            ? "app snow"
            : "app default"
          : "app default"
      }>
      <main>
        {typeof weather.main !== "undefined" ? (
          <div className="location-box">
            <div className="location">
              <div className="city">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <div className="weather-details">
              <div className="icon">
                {weather.main === ("rain" || "shower rain" || "thunderstorm")
                  ? "🌧"
                  : weather.main === "snow"
                  ? "🌨"
                  : weather.main === "clear sky"
                  ? "☀️"
                  : "⛅️"}
              </div>
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
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <button onClick={search}>Search</button>
        </div>
      </main>
    </div>
  );
};

export default App;
