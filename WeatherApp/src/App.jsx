import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'cefecae1fce5e91a5a3e32aad7ce83ac';

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setWeatherData(null);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found. Please check the spelling.');
      }

      const data = await response.json();

      setWeatherData({
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        condition: data.weather[0].main,
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>React Weather App 🌦</h1>
      <p>Find out the current weather in any city!</p>
      
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city name..."
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-details">
          <h2>Weather in {weatherData.name}</h2>
          <p><strong>Temperature:</strong> {Math.round(weatherData.temp)}°C</p>
          <p><strong>Condition:</strong> {weatherData.condition}</p>
          <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
