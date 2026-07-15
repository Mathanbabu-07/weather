import React from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, Moon } from 'lucide-react';
import { mapWeatherCode } from '../utils/weatherCodeMapper';
import './ForecastCard.css';

const ForecastCard = ({ forecastDay }) => {
  const { date, tempMax, tempMin, weatherCode } = forecastDay;
  
  const category = mapWeatherCode(weatherCode, 1);
  
  const getDayName = (dateStr) => {
    const dateObj = new Date(dateStr + 'T00:00:00');
    return dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const renderIcon = (cat) => {
    const size = 18;
    switch (cat) {
      case 'Sunny':
        return <Sun size={size} className="forecast-icon sunny" />;
      case 'Partly Cloudy':
        return <CloudSun size={size} className="forecast-icon partly-cloudy" />;
      case 'Cloudy':
        return <Cloud size={size} className="forecast-icon cloudy" />;
      case 'Rain':
        return <CloudRain size={size} className="forecast-icon rainy" />;
      case 'Thunderstorm':
        return <CloudLightning size={size} className="forecast-icon thunderstorm" />;
      case 'Snow':
        return <Snowflake size={size} className="forecast-icon snowy" />;
      case 'Fog':
        return <CloudFog size={size} className="forecast-icon foggy" />;
      case 'Night':
        return <Moon size={size} className="forecast-icon night" />;
      default:
        return <Sun size={size} className="forecast-icon" />;
    }
  };

  return (
    <div className="forecast-item">
      <div className="forecast-label">
        {renderIcon(category)}
        <span className="forecast-day-name">{getDayName(date)}</span>
      </div>
      <div className="forecast-temp-range">
        {Math.round(tempMax)}° / {Math.round(tempMin)}°
      </div>
    </div>
  );
};

export default ForecastCard;
