import React from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, Moon } from 'lucide-react';
import { mapWeatherCode } from '../utils/weatherCodeMapper';

const ForecastDay = ({ dayData }) => {
  const { date, tempMax, tempMin, weatherCode } = dayData;

  const category = mapWeatherCode(weatherCode, 1);

  const getDayName = (dateStr) => {
    try {
      const dateObj = new Date(dateStr + 'T00:00:00');
      
      // Check if it is today
      const today = new Date();
      if (dateObj.toDateString() === today.toDateString()) {
        return 'Today';
      }

      return dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    } catch (e) {
      return dateStr;
    }
  };

  const renderIcon = (cat) => {
    const size = 26;
    switch (cat) {
      case 'Sunny':
        return <Sun size={size} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.25)]" />;
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
      whileHover={{ 
        y: -6, 
        scale: 1.03,
        boxShadow: "0px 0px 18px rgba(46,139,255,0.22)", 
        borderColor: "rgba(46,139,255,0.3)" 
      }}
      className="flex flex-col items-center justify-between py-3.5 px-2 bg-white/4 border border-white/8 hover:bg-white/8 rounded-[16px] min-w-[65px] flex-1 text-center transition-all duration-200 cursor-pointer select-none"
    >
      <span className="text-[11px] font-bold text-white/60 tracking-wider">
        {getDayName(date)}
      </span>
      <div className="my-2.5 flex items-center justify-center min-h-[30px]">
        {renderIcon(category)}
      </div>
      <div className="text-xs font-bold tracking-tight">
        <span className="text-white">{Math.round(tempMax)}°</span>
        <span className="text-white/30 mx-1">/</span>
        <span className="text-white/50">{Math.round(tempMin)}°</span>
      </div>
    </motion.div>
  );
};

export default ForecastDay;
