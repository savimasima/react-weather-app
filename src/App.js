import React from "react";
import './App.css';
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity = "Kyiv"/>
        <footer>
          This project was coded by savimasima and is{" "}
          <a href="https://github.com/savimasima/react-weather-app">open-sourced on GitHub</a>
        </footer>
      </div>  
    </div>
  );
}

