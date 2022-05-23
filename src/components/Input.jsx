import React, { useState } from "react";
import axios from "axios";

function Input() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c7802c927c8f52f8389fc5611a185eed`;
  let icon = "";
  function savelocation(event) {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
      console.log(response.data.weather[0].icon);
      icon = response.data.weather[0].icon;
    });
    setLocation(" ");
    event.preventDefault();
  }
  const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  console.log(iconUrl);
  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <form onSubmit={savelocation}>
            <input
              className="inputValue"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              type="text"
              placeholder="enter the city name"
            />
            <input className="inputValue" type="submit" value="Search" />
          </form>
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
        </div>
        <div className="middle">
          <div className="feelsLike">
            {data.weather ? (
              <p className="bold">{data.main.feels_like}°C</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="minTemp">
            {data.main ? <p className="bold">{data.main.temp_min}°C</p> : null}
            <p>Min Temp</p>
          </div>
          <div className="maxTemp">
            {data.wind ? <p className="bold">{data.main.temp_max}°C</p> : null}
            <p>Min Temp</p>
          </div>
        </div>
        <div className="bottom">
          <div className="description">
            {data.weather ? (
              <p className="bold">{data.weather[0].description}</p>
            ) : null}
            <img src="iconUrl" alt="" />
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed}km/h</p> : null}
            <p>wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Input;
