import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';

const SunriseCard = ({ weatherData }) => {
  const { sunrise, sunset, currentTime } = weatherData;

  const formatTimeString = (isoStr) => {
    if (!isoStr) return '--:--';
    try {
      const date = new Date(isoStr);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return '--:--';
    }
  };

  // Calculate sun position along the semi-circle path
  const getSunPosition = () => {
    if (!sunrise || !sunset || !currentTime) {
      return { cx: 50, cy: 50, visible: false };
    }
    try {
      const riseTime = new Date(sunrise).getTime();
      const setTime = new Date(sunset).getTime();
      const currTime = new Date(currentTime).getTime();

      if (currTime < riseTime) {
        return { cx: 10, cy: 50, visible: true }; // Position at sunrise
      }
      if (currTime > setTime) {
        return { cx: 90, cy: 50, visible: false }; // Position at sunset (hidden or on baseline)
      }

      // Calculate fraction of day elapsed
      const fraction = (currTime - riseTime) / (setTime - riseTime);
      
      // Calculate angle from Math.PI (180 deg, left) to 0 (0 deg, right)
      const angle = Math.PI - (fraction * Math.PI);
      const radius = 40;
      const cx = 50 + radius * Math.cos(angle);
      const cy = 50 - radius * Math.sin(angle);

      return { cx, cy, visible: true };
    } catch (e) {
      return { cx: 50, cy: 10, visible: true }; // Default to peak midday
    }
  };

  const sunPos = getSunPosition();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-1 bg-white/8 backdrop-blur-[18px] border border-white/15 rounded-[20px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col text-white justify-between h-[230px]"
    >
      <h4 className="text-sm font-bold text-white/80 tracking-wide">
        Sunrise & Sunset
      </h4>

      {/* Semicircle sun path */}
      <div className="relative flex justify-center items-center my-2">
        <svg viewBox="0 0 100 60" className="w-[125px] h-[75px]">
          {/* Dashed background arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          
          {/* Horizontal base line */}
          <line
            x1="5"
            y1="50"
            x2="95"
            y2="50"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />

          {/* Glowing yellow sun icon positioned dynamically */}
          {sunPos.visible && (
            <motion.circle
              cx={sunPos.cx}
              cy={sunPos.cy}
              r="4.5"
              fill="#FFD54A"
              filter="drop-shadow(0px 0px 4px #FFD54A)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            />
          )}
        </svg>
      </div>

      {/* Bottom sunrise & sunset times */}
      <div className="flex justify-between items-center pt-2">
        {/* Sunrise */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-white/60">
            <Sunrise size={13} className="text-yellow-400" />
            <span className="text-[10px] font-bold tracking-wider">SUNRISE</span>
          </div>
          <span className="text-xs font-semibold">
            {formatTimeString(sunrise)}
          </span>
        </div>

        {/* Sunset */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-white/60">
            <Sunset size={13} className="text-orange-400" />
            <span className="text-[10px] font-bold tracking-wider">SUNSET</span>
          </div>
          <span className="text-xs font-semibold">
            {formatTimeString(sunset)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SunriseCard;
