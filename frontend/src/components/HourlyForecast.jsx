import React from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, Moon } from 'lucide-react';
import { mapWeatherCode } from '../utils/weatherCodeMapper';

const HourlyForecast = ({ hourlyData }) => {
  const formatHour = (timeStr, idx) => {
    if (idx === 0) return 'Now';
    try {
      const date = new Date(timeStr);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
      });
    } catch (e) {
      return timeStr;
    }
  };

  const renderIcon = (code) => {
    // Hourly forecasts are shown as day conditions
    const cat = mapWeatherCode(code, 1);
    const size = 26;
    switch (cat) {
      case 'Sunny':
        return <Sun size={size} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]" />;
      case 'Partly Cloudy':
        return <CloudSun size={size} className="text-sky-200" />;
      case 'Cloudy':
        return <Cloud size={size} className="text-slate-300" />;
      case 'Rain':
        return <CloudRain size={size} className="text-blue-400" />;
      case 'Thunderstorm':
        return <CloudLightning size={size} className="text-amber-400" />;
      case 'Snow':
        return <Snowflake size={size} className="text-blue-200" />;
      case 'Fog':
        return <CloudFog size={size} className="text-slate-400" />;
      case 'Night':
        return <Moon size={size} className="text-purple-300" />;
      default:
        return <Sun size={size} className="text-yellow-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full h-[180px] bg-white/8 backdrop-blur-[18px] border border-white/15 rounded-[20px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col justify-between text-white"
    >
      <h3 className="text-sm font-bold text-white/80 tracking-wide mb-3">
        Hourly Forecast
      </h3>

      <div className="flex items-center gap-4 overflow-x-auto pb-2 scroll-smooth w-full">
        {hourlyData && hourlyData.length > 0 ? (
          hourlyData.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.12)" }}
              className="flex flex-col items-center justify-between min-w-[70px] flex-1 py-3 px-1 rounded-xl bg-white/3 hover:bg-white/10 hover:border-white/20 border border-transparent transition-all duration-200 cursor-pointer select-none"
            >
              <span className="text-xs font-semibold text-white/60 tracking-wider">
                {formatHour(item.time, idx)}
              </span>
              <div className="my-2 flex items-center justify-center min-h-[30px]">
                {renderIcon(item.weatherCode)}
              </div>
              <span className="text-sm font-bold tracking-tight">
                {Math.round(item.temp)}°
              </span>
            </motion.div>
          ))
        ) : (
          <p className="text-xs text-white/50 w-full text-center py-4">No hourly forecast available</p>
        )}
      </div>
    </motion.div>
  );
};

export default HourlyForecast;
