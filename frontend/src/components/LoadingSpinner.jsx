import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-glow"></div>
      </div>
      <p className="loading-text">Fetching live weather data...</p>
    </div>
  );
};

export default LoadingSpinner;
