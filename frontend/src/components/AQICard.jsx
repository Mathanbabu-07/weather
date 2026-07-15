import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

const AQICard = ({ weatherData }) => {
  const { aqi, pm2_5 } = weatherData;

  const getAQIDetails = (val) => {
    if (val === null || val === undefined) {
      return { label: "Unknown", color: "#94a3b8", status: "No Data", percent: 0 };
    }
    if (val <= 50) {
      return { label: "Good", color: "#39D98A", status: "Healthy", percent: (val / 500) * 100 };
    }
    if (val <= 100) {
      return { label: "Moderate", color: "#FFD54A", status: "Acceptable", percent: (val / 500) * 100 };
    }
    if (val <= 150) {
      return { label: "Unhealthy for Sensitive Groups", color: "#FF8A4C", status: "Moderate", percent: (val / 500) * 100 };
    }
    if (val <= 200) {
      return { label: "Unhealthy", color: "#FF4F6D", status: "High Risk", percent: (val / 500) * 100 };
    }
    return { label: "Very Unhealthy", color: "#a855f7", status: "Hazardous", percent: (val / 500) * 100 };
  };

  const details = getAQIDetails(aqi);

  // SVG arc path configuration (length of semi-circle is ~125.6)
  const arcLength = 125.6;
  // Make sure the gauge shows at least a sliver if value is above zero
  const fillPercentage = aqi > 0 ? Math.max((aqi / 300) * 100, 5) : 0; 
  const dashOffset = arcLength - (arcLength * Math.min(fillPercentage, 100)) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-1 bg-white/8 backdrop-blur-[18px] border border-white/15 rounded-[20px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col text-white justify-between h-[230px]"
    >
      <h4 className="text-sm font-bold text-white/80 tracking-wide">
        Air Quality Index
      </h4>

      {/* SVG Semicircular progress gauge */}
      <div className="relative flex flex-col items-center justify-center my-2">
        <svg viewBox="0 0 100 60" className="w-[125px] h-[75px]">
          {/* Background track */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active progress track */}
          <motion.path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={details.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Central value readouts */}
        <div className="absolute top-[28px] flex flex-col items-center">
          <span className="text-2xl font-bold leading-none select-none tracking-tight">
            {aqi !== null && aqi !== undefined ? <AnimatedNumber value={aqi} /> : '--'}
          </span>
          <span 
            className="text-[10px] font-semibold mt-1 px-1.5 py-0.5 rounded-full select-none"
            style={{ backgroundColor: `${details.color}18`, color: details.color }}
          >
            {details.label}
          </span>
        </div>
      </div>

      {/* Bottom PM2.5 reads */}
      <div className="flex justify-between items-center border-t border-white/10 pt-3">
        <span className="text-[11px] font-bold text-white/50 tracking-wider">PM2.5</span>
        <span className="text-xs font-semibold tracking-wide">
          {pm2_5 ? `${Math.round(pm2_5)} µg/m³` : '--'}
        </span>
      </div>
    </motion.div>
  );
};

export default AQICard;
