import React from 'react';
import { motion } from 'framer-motion';
import ForecastDay from './ForecastDay';
import { ChevronRight } from 'lucide-react';

const SevenDayForecast = ({ forecastData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full h-[170px] bg-white/8 backdrop-blur-[18px] border border-white/15 rounded-[20px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col justify-between text-white"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-white/80 tracking-wide">
          7-Day Forecast
        </h3>
        <button 
          type="button"
          className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full transition-all duration-200"
        >
          <span>View Full Forecast</span>
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="flex items-stretch justify-between gap-2 w-full overflow-x-auto sm:overflow-x-visible">
        {forecastData && forecastData.length > 0 ? (
          forecastData.slice(0, 7).map((day, idx) => (
            <ForecastDay key={idx} dayData={day} />
          ))
        ) : (
          <p className="text-xs text-white/50 w-full text-center py-2">No forecast available</p>
        )}
      </div>
    </motion.div>
  );
};

export default SevenDayForecast;
