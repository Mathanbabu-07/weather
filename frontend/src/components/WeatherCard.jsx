import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';
import { mapWeatherCode, getWeatherDescription } from '../utils/weatherCodeMapper';

const CARD_LANDSCAPES = {
  Sunny: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=800",
  "Partly Cloudy": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=800",
  Cloudy: "https://images.unsplash.com/photo-1483702721471-b63ef0465512?q=80&w=800",
  Rain: "https://images.unsplash.com/photo-1437627885742-886f483a690e?q=80&w=800",
  Thunderstorm: "https://images.unsplash.com/photo-1472120482537-4740e6be220f?q=80&w=800",
  Snow: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=800",
  Fog: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=800",
  Night: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800"
};

const CITY_IMAGES = {
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?q=80&w=800",
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=800",
  chennai: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800",
  "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800",
  sydney: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800",
  mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800",
  cairo: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800",
  delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800",
  italy: "https://images.unsplash.com/photo-1531572753322-ad063caff12e?q=80&w=800",
  bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800",
  singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800"
};

const WeatherCard = ({ weatherData }) => {
  const { city, country, temperature, feelsLike, weatherCode, isDay, currentTime, forecast } = weatherData;
  
  const category = mapWeatherCode(weatherCode, isDay);
  const description = getWeatherDescription(weatherCode, isDay);
  
  // Format current date
  const formatDate = (timeStr) => {
    try {
      const date = new Date(timeStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return '';
    }
  };

  // Find max/min temp for current day
  const todayForecast = forecast && forecast.length > 0 ? forecast[0] : null;
  const tempMax = todayForecast ? Math.round(todayForecast.tempMax) : 31;
  const tempMin = todayForecast ? Math.round(todayForecast.tempMin) : 18;

  // Determine dynamic cityscape image or fallback to general weather background image
  const cleanCity = city ? city.toLowerCase().trim() : "";
  const bgImage = CITY_IMAGES[cleanCity] || CARD_LANDSCAPES[category] || CARD_LANDSCAPES.Sunny;

  const getBadgeEmoji = (cat) => {
    switch (cat) {
      case 'Sunny': return '☀️';
      case 'Partly Cloudy': return '🌤️';
      case 'Cloudy': return '☁️';
      case 'Rain': return '🌧️';
      case 'Thunderstorm': return '⛈️';
      case 'Snow': return '❄️';
      case 'Fog': return '🌫️';
      case 'Night': return '🌙';
      default: return '☀️';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full h-[430px] rounded-[24px] overflow-hidden bg-white/8 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col justify-between p-8 text-white group"
    >
      {/* Background cityscape with hover scale zoom. Cleared alt string and added error fallback */}
      <img
        src={bgImage}
        alt=""
        onError={(e) => { e.target.style.display = 'none'; }}
        className="absolute inset-0 w-full h-full object-cover -z-10 transition-transform duration-[4000ms] group-hover:scale-105 filter brightness-[0.75] saturate-[0.9]"
      />

      {/* Dark overlay & bottom gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>


      {/* TOP ROW: Location & Weather Badge */}
      <div className="flex justify-between items-start w-full">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md">
            {city}, {country}
          </h2>
          <p className="text-sm font-medium text-white/70 mt-1 drop-shadow-sm">
            {formatDate(currentTime)}
          </p>
        </div>

        {/* Floating weather badge */}
        <motion.div 
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 h-9 rounded-full border border-white/10 shadow-lg text-sm font-semibold"
        >
          <span>{getBadgeEmoji(category)}</span>
          <span>{category}</span>
        </motion.div>
      </div>

      {/* BOTTOM ROW: Temperature & Condition details */}
      <div className="flex flex-col items-start w-full mt-auto">
        <div className="flex items-baseline gap-2">
          {/* Huge temperature font size 96px */}
          <span className="text-[96px] font-bold leading-none tracking-tighter drop-shadow-lg">
            <AnimatedNumber value={Math.round(temperature)} />
          </span>
          <span className="text-4xl font-semibold -translate-y-9">°c</span>
        </div>
        
        {/* Description font size 32px */}
        <h3 className="text-[32px] font-bold leading-tight mt-1 drop-shadow-md text-white/95">
          {description}
        </h3>

        {/* High/Low & Feels like */}
        <div className="flex items-center gap-4 mt-3 text-sm font-medium text-white/80 drop-shadow">
          <span className="flex items-center gap-1">
            <span className="text-accent font-bold">↑</span> {tempMax}°
            <span className="text-white/40 ml-1">|</span>
            <span className="text-red-400 font-bold ml-1">↓</span> {tempMin}°
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
          <span>Feels like {Math.round(feelsLike)}°</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
