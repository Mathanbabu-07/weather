import React from 'react';
import './WeatherBackground.css';

const WeatherBackground = ({ condition }) => {
  const activeCondition = condition ? condition.toLowerCase().replace(/\s+/g, '-') : 'sunny';
  
  const renderBackgroundEffects = () => {
    switch (activeCondition) {
      case 'sunny':
        return (
          <>
            <div className="sun-glow"></div>
            <div className="floating-clouds-container">
              <div className="cloud cloud-1"></div>
              <div className="cloud cloud-2"></div>
            </div>
          </>
        );
      case 'partly-cloudy':
        return (
          <>
            <div className="floating-clouds-container">
              <div className="cloud cloud-1"></div>
              <div className="cloud cloud-2"></div>
              <div className="cloud cloud-3"></div>
            </div>
          </>
        );
      case 'cloudy':
        return (
          <div className="dense-clouds-container">
            <div className="dense-cloud d-cloud-1"></div>
            <div className="dense-cloud d-cloud-2"></div>
            <div className="dense-cloud d-cloud-3"></div>
          </div>
        );
      case 'rain':
        return (
          <>
            <div className="fog-overlay-light"></div>
            <div className="rain-particles-container">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i} 
                  className="rain-drop" 
                  style={{ 
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${0.8 + Math.random() * 0.5}s` 
                  }}
                ></div>
              ))}
            </div>
          </>
        );
      case 'thunderstorm':
        return (
          <>
            <div className="lightning-overlay"></div>
            <div className="rain-particles-container">
              {Array.from({ length: 45 }).map((_, i) => (
                <div 
                  key={i} 
                  className="rain-drop" 
                  style={{ 
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    animationDuration: `${0.6 + Math.random() * 0.4}s` 
                  }}
                ></div>
              ))}
            </div>
          </>
        );
      case 'snow':
        return (
          <div className="snow-particles-container">
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className="snow-flake" 
                style={{ 
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                  opacity: Math.random(),
                  transform: `scale(${0.5 + Math.random() * 0.8})`
                }}
              ></div>
            ))}
          </div>
        );
      case 'fog':
        return (
          <div className="fog-layers-container">
            <div className="fog-layer fog-layer-1"></div>
            <div className="fog-layer fog-layer-2"></div>
            <div className="fog-layer fog-layer-3"></div>
          </div>
        );
      case 'night':
        return (
          <>
            <div className="moon-glow"></div>
            <div className="twinkling-stars-container">
              {Array.from({ length: 35 }).map((_, i) => (
                <div 
                  key={i} 
                  className="star" 
                  style={{ 
                    top: `${Math.random() * 60}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${1.5 + Math.random() * 2}s` 
                  }}
                ></div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`weather-bg-viewport ${activeCondition}`}>
      <div className="weather-bg-overlay"></div>
      {renderBackgroundEffects()}
    </div>
  );
};

export default WeatherBackground;
