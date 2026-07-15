import React from 'react';

const LANDSCAPE_IMAGES = {
  Sunny: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=1200",
  "Partly Cloudy": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1200",
  Cloudy: "https://images.unsplash.com/photo-1483702721471-b63ef0465512?q=80&w=1200",
  Rain: "https://images.unsplash.com/photo-1437627885742-886f483a690e?q=80&w=1200",
  Thunderstorm: "https://images.unsplash.com/photo-1472120482537-4740e6be220f?q=80&w=1200",
  Snow: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=1200",
  Fog: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=1200",
  Night: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200"
};

const Background = ({ condition }) => {
  const imageUrl = LANDSCAPE_IMAGES[condition] || LANDSCAPE_IMAGES.Sunny;

  return (
    <div className="fixed inset-0 w-screen h-screen -z-20 overflow-hidden select-none">
      {/* Layer 1: Weather landscape image */}
      <img
        src={imageUrl}
        alt="Weather Landscape"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out scale-105 filter saturate-[0.8]"
      />

      {/* Layer 2: rgba(0,70,150,.35) */}
      <div className="absolute inset-0 bg-[rgba(0,70,150,0.32)] mix-blend-overlay transition-colors duration-[2000ms]"></div>

      {/* Layer 3: linear-gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,30,80,0.42)] to-[rgba(0,60,120,0.52)] mix-blend-multiply"></div>

      {/* Radial soft glow / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.45)_90%)]"></div>

      {/* Layer 4: Backdrop blur */}
      <div className="absolute inset-0 backdrop-blur-[24px]"></div>
    </div>
  );
};

export default Background;
