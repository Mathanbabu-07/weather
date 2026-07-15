import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react';

const CurrentConditions = ({ weatherData }) => {
  const { temperature, humidity, windSpeed, windDirection, visibility, pressure, uvIndex } = weatherData;

  const getUVBadge = (uv) => {
    if (uv === null || uv === undefined) return null;
    if (uv <= 2) return { text: "Low", bg: "bg-aqi-green/20 text-aqi-green border-aqi-green/30" };
    if (uv <= 5) return { text: "Moderate", bg: "bg-aqi-yellow/20 text-yellow-400 border-yellow-400/30" };
    if (uv <= 7) return { text: "High", bg: "bg-aqi-orange/20 text-aqi-orange border-aqi-orange/30" };
    if (uv <= 10) return { text: "Very High", bg: "bg-aqi-red/20 text-aqi-red border-aqi-red/30" };
    return { text: "Extreme", bg: "bg-purple-500/20 text-purple-400 border-purple-500/30" };
  };

  const uvBadge = getUVBadge(uvIndex);

  const rows = [
    {
      icon: <Thermometer size={18} className="text-white/60 group-hover:text-red-400 transition-colors" />,
      label: "Temperature",
      value: `${Math.round(temperature)}°C`
    },
    {
      icon: <Droplets size={18} className="text-white/60 group-hover:text-sky-400 transition-colors" />,
      label: "Humidity",
      value: `${humidity}%`
    },
    {
      icon: <Wind size={18} className="text-white/60 group-hover:text-emerald-400 transition-colors" />,
      label: "Wind Speed",
      value: `${windSpeed.toFixed(1)} km/h ${windDirection}`
    },
    {
      icon: <Eye size={18} className="text-white/60 group-hover:text-teal-400 transition-colors" />,
      label: "Visibility",
      value: `${visibility} km`
    },
    {
      icon: <Gauge size={18} className="text-white/60 group-hover:text-indigo-400 transition-colors" />,
      label: "Pressure",
      value: `${Math.round(pressure)} hPa`
    },
    {
      icon: <Sun size={18} className="text-white/60 group-hover:text-yellow-400 transition-colors" />,
      label: "UV Index",
      value: Math.round(uvIndex),
      badge: uvBadge
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full bg-white/8 backdrop-blur-[18px] border border-white/15 rounded-[20px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col text-white"
    >
      <h3 className="text-lg font-bold text-white/95 mb-4 tracking-wide">
        Current Conditions
      </h3>

      <div className="flex flex-col">
        {rows.map((row, idx) => (
          <div key={idx}>
            {idx > 0 && <div className="border-t border-white/10 my-0.5"></div>}
            
            <div className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-white/5 transition-all duration-150 group">
              <div className="flex items-center gap-3">
                {row.icon}
                <span className="text-sm font-medium text-white/70 tracking-wide">
                  {row.label}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-wider">
                  {row.value}
                </span>
                {row.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${row.badge.bg}`}>
                    {row.badge.text}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CurrentConditions;
