import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import CurrentConditions from './components/CurrentConditions';
import AQICard from './components/AQICard';
import SunriseCard from './components/SunriseCard';
import HourlyForecast from './components/HourlyForecast';
import SevenDayForecast from './components/SevenDayForecast';
import Background from './components/Background';
import LoadingSpinner from './components/LoadingSpinner';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeather } from './services/api';
import { mapWeatherCode } from './utils/weatherCodeMapper';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name to search');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(cityName);
      setWeather(data);
      localStorage.setItem('lastCity', data.city);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity') || 'London';
    handleSearch(lastCity);
  }, []);

  const weatherCategory = weather ? mapWeatherCode(weather.weatherCode, weather.isDay) : 'Sunny';

  return (
    <div className="relative w-screen min-h-screen lg:h-screen lg:overflow-hidden flex items-center justify-center p-3 sm:p-6 select-none">
      {/* Condition-based landscape background layering */}
      <Background condition={weatherCategory} />
      
      <main className="w-full max-w-[1450px] h-full flex flex-col gap-5 z-10 overflow-y-auto pr-1">
        {/* Error messaging overlay */}
        {error && <ErrorMessage message={error} />}

        {/* Top full-width Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {loading && !weather ? (
          <div className="flex-1 w-full flex items-center justify-center bg-white/5 backdrop-blur-md rounded-[24px] border border-white/10 shadow-2xl">
            <LoadingSpinner />
          </div>
        ) : (
          weather && (
            <div className="relative flex flex-col gap-5 pb-4">
              
              {/* Fade in/out glass loading overlay */}
              <AnimatePresence>
                {loading && <LoadingOverlay />}
              </AnimatePresence>
              
              {/* Main Dual Column Grid (Left 65% / Right 35%) */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.85fr_1fr] gap-5 items-start">
                
                {/* Left Column (Hero Card & Hourly) */}
                <div className="w-full flex flex-col gap-5">
                  <WeatherCard weatherData={weather} />
                  <HourlyForecast hourlyData={weather.hourlyForecast} />
                </div>

                {/* Right Column (Conditions, AQI, Sunrise) */}
                <div className="w-full flex flex-col gap-5">
                  <CurrentConditions weatherData={weather} />
                  
                  {/* AQI & Sunrise side-by-side inside Right Column */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    <AQICard weatherData={weather} />
                    <SunriseCard weatherData={weather} />
                  </div>
                </div>

              </div>

              {/* Bottom Full-width 7-Day Forecast */}
              <div className="w-full">
                <SevenDayForecast forecastData={weather.forecast} />
              </div>

            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;
