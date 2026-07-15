import requests
from datetime import datetime

GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search"
FORECAST_API_URL = "https://api.open-meteo.com/v1/forecast"
AQI_API_URL = "https://air-quality-api.open-meteo.com/v1/air-quality"
TIMEOUT_SECONDS = 5

def degrees_to_compass(deg):
    """Convert wind direction in degrees to compass direction."""
    if deg is None:
        return ""
    val = int((deg / 22.5) + 0.5)
    arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return arr[(val % 16)]

def get_coordinates(city_name):
    """
    Search city name and obtain latitude, longitude, city, and country.
    """
    params = {
        "name": city_name,
        "count": 1,
        "language": "en",
        "format": "json"
    }
    try:
        response = requests.get(GEOCODING_API_URL, params=params, timeout=TIMEOUT_SECONDS)
        response.raise_for_status()
        data = response.json()
        
        results = data.get("results")
        if not results or len(results) == 0:
            return None
            
        result = results[0]
        return {
            "latitude": result.get("latitude"),
            "longitude": result.get("longitude"),
            "city": result.get("name"),
            "country": result.get("country", "")
        }
    except requests.exceptions.Timeout:
        raise Exception("Geocoding API request timed out")
    except requests.exceptions.RequestException as e:
        raise Exception(f"Geocoding API error: {str(e)}")

def get_air_quality(lat, lon):
    """
    Fetch current Air Quality Index (US AQI) and PM2.5 from Open-Meteo Air Quality API.
    """
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "us_aqi,pm2_5"
    }
    try:
        response = requests.get(AQI_API_URL, params=params, timeout=TIMEOUT_SECONDS)
        response.raise_for_status()
        data = response.json()
        current = data.get("current", {})
        return {
            "aqi": current.get("us_aqi"),
            "pm2_5": current.get("pm2_5")
        }
    except Exception:
        # Graceful fallback if AQI API fails or is slow
        return {
            "aqi": None,
            "pm2_5": None
        }

def get_weather(lat, lon):
    """
    Fetch comprehensive current weather, hourly forecast, and 7-day forecast.
    """
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,is_day",
        "hourly": "temperature_2m,weather_code",
        "daily": "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max",
        "timezone": "auto",
        "forecast_days": 7
    }
    try:
        response = requests.get(FORECAST_API_URL, params=params, timeout=TIMEOUT_SECONDS)
        response.raise_for_status()
        data = response.json()
        
        current = data.get("current", {})
        hourly = data.get("hourly", {})
        daily = data.get("daily", {})
        
        # 1. Parse current conditions details
        wind_dir_deg = current.get("wind_direction_10m")
        wind_dir_compass = degrees_to_compass(wind_dir_deg)
        
        # Convert visibility from meters to km
        vis_meters = current.get("visibility")
        visibility_km = round(vis_meters / 1000.0, 1) if vis_meters is not None else None
        
        # Current day daily metrics (sunrise, sunset, uv index)
        sunrise_list = daily.get("sunrise", [])
        sunset_list = daily.get("sunset", [])
        uv_list = daily.get("uv_index_max", [])
        
        # 2. Slice next 8 hours for hourly forecast
        current_time_str = current.get("time")
        hourly_times = hourly.get("time", [])
        hourly_temps = hourly.get("temperature_2m", [])
        hourly_codes = hourly.get("weather_code", [])
        
        start_idx = 0
        for idx, t in enumerate(hourly_times):
            if t >= current_time_str:
                start_idx = idx
                break
                
        hourly_forecast = []
        for i in range(start_idx, min(start_idx + 8, len(hourly_times))):
            hourly_forecast.append({
                "time": hourly_times[i],
                "temp": hourly_temps[i] if i < len(hourly_temps) else None,
                "weatherCode": hourly_codes[i] if i < len(hourly_codes) else None
            })
            
        # 3. Parse 7-day forecast data
        forecast_list = []
        dates = daily.get("time", [])
        temp_maxs = daily.get("temperature_2m_max", [])
        temp_mins = daily.get("temperature_2m_min", [])
        weather_codes = daily.get("weather_code", [])
        
        for i in range(len(dates)):
            forecast_list.append({
                "date": dates[i],
                "tempMax": temp_maxs[i] if i < len(temp_maxs) else None,
                "tempMin": temp_mins[i] if i < len(temp_mins) else None,
                "weatherCode": weather_codes[i] if i < len(weather_codes) else None
            })
            
        # 4. Fetch Air Quality details
        aqi_data = get_air_quality(lat, lon)
        
        return {
            "temperature": current.get("temperature_2m"),
            "feelsLike": current.get("apparent_temperature"),
            "humidity": current.get("relative_humidity_2m"),
            "windSpeed": current.get("wind_speed_10m"),
            "windDirection": wind_dir_compass,
            "pressure": current.get("surface_pressure"),
            "visibility": visibility_km,
            "weatherCode": current.get("weather_code"),
            "isDay": current.get("is_day"),
            "currentTime": current.get("time"),
            
            # Sunrise / Sunset / UV Index
            "sunrise": sunrise_list[0] if len(sunrise_list) > 0 else None,
            "sunset": sunset_list[0] if len(sunset_list) > 0 else None,
            "uvIndex": uv_list[0] if len(uv_list) > 0 else None,
            
            # AQI
            "aqi": aqi_data["aqi"],
            "pm2_5": aqi_data["pm2_5"],
            
            # Forecast arrays
            "hourlyForecast": hourly_forecast,
            "forecast": forecast_list
        }
    except requests.exceptions.Timeout:
        raise Exception("Forecast API request timed out")
    except requests.exceptions.RequestException as e:
        raise Exception(f"Forecast API error: {str(e)}")
