import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function Weather(props) {
    let [weatherData, setWeatherData] = useState({ ready: false });
    let [city, setCity] = useState(props.defaultCity);

    function handleResponse(response) {
        setWeatherData({
          ready: true,
          coordinates: response.data.coord,
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          date: new Date(response.data.dt * 1000),
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          wind: response.data.wind.speed,
          city: response.data.name,
        });
    }

    function search() {
        const apiKey = "48435e74e411805d55ae4636686d6b40";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    if (weatherData.ready) {
        return (
            <div className="Weather">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-9 col-8">
                            <input 
                                type="search" 
                                placeholder="Enter a city"
                                className="form-control"
                                autoFocus="on"
                                onChange={handleCityChange}
                            />
                        </div>
                        <div className="col-sm-3 col-4">    
                            <input 
                                type="submit" 
                                value="Search"
                                className="btn btn-primary w-100"
                                onClick={handleCityChange}
                            />
                        </div>    
                    </div>    
                </form>
                <WeatherInfo data={weatherData} size={52} />
                <WeatherForecast coordinates={weatherData.coordinates} />
            </div>    
        );
    } else {
        search();
        return "Loading..." 
    }
}