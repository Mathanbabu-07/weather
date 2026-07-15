import React from 'react';
import { motion } from 'framer-motion';

const LoadingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/25 backdrop-blur-[6px] z-40 flex flex-col items-center justify-center rounded-[24px]"
    >
      <div className="relative w-16 h-16 mb-4">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-[3.5px] border-primary/20 border-t-primary rounded-full"
        />
        {/* Inner reverse rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-[3.5px] border-accent/20 border-t-accent rounded-full"
        />
      </div>
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-white text-sm font-semibold tracking-wider drop-shadow-md select-none"
      >
        Updating weather forecast...
      </motion.p>
    </motion.div>
  );
};

export default LoadingOverlay;
