export function mapWeatherCode(code, isDay) {
  // If it's night, clear or partly cloudy weather is shown as Night background
  if (isDay === 0 && (code === 0 || code === 1 || code === 2)) {
    return 'Night';
  }
  
  if (code === 0 || code === 1) {
    return 'Sunny';
  } else if (code === 2) {
    return 'Partly Cloudy';
  } else if (code === 3) {
    return 'Cloudy';
  } else if (code === 45 || code === 48) {
    return 'Fog';
  } else if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    return 'Rain';
  } else if (
    (code >= 71 && code <= 77) ||
    (code >= 85 && code <= 86)
  ) {
    return 'Snow';
  } else if (code === 95 || code === 96 || code === 99) {
    return 'Thunderstorm';
  }
  
  return isDay === 0 ? 'Night' : 'Sunny';
}

export function getWeatherDescription(code, isDay) {
  switch (code) {
    case 0:
      return isDay === 0 ? 'Clear Night' : 'Sunny & Clear';
    case 1:
      return isDay === 0 ? 'Mostly Clear' : 'Mainly Clear';
    case 2:
      return 'Partly Cloudy';
    case 3:
      return 'Overcast';
    case 45:
    case 48:
      return 'Foggy';
    case 51:
    case 53:
    case 55:
      return 'Drizzle';
    case 56:
    case 57:
      return 'Freezing Drizzle';
    case 61:
      return 'Light Rain';
    case 63:
      return 'Moderate Rain';
    case 65:
      return 'Heavy Rain';
    case 66:
    case 67:
      return 'Freezing Rain';
    case 71:
      return 'Light Snow';
    case 73:
      return 'Moderate Snow';
    case 75:
      return 'Heavy Snow';
    case 77:
      return 'Snow Grains';
    case 80:
    case 81:
    case 82:
      return 'Rain Showers';
    case 85:
    case 86:
      return 'Snow Showers';
    case 95:
      return 'Thunderstorm';
    case 96:
    case 99:
      return 'Thunderstorm with Hail';
    default:
      return 'Unknown';
  }
}
