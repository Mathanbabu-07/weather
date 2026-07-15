from flask import Flask, request, jsonify
from flask_cors import CORS
from weather import get_coordinates, get_weather

app = Flask(__name__)
CORS(app)

@app.route('/weather', methods=['GET'])
def weather_endpoint():
    city_name = request.args.get('city')
    
    if not city_name or not city_name.strip():
        return jsonify({"error": "City parameter is required"}), 400
        
    city_name = city_name.strip()
    
    try:
        # Step 1: Geocoding
        coords = get_coordinates(city_name)
        if not coords:
            return jsonify({"error": "City not found"}), 404
            
        # Step 2: Fetch Weather Forecast & AQI
        weather_data = get_weather(coords["latitude"], coords["longitude"])
        
        # Step 3: Construct Response
        response = {
            "city": coords["city"],
            "country": coords["country"],
            "temperature": weather_data["temperature"],
            "feelsLike": weather_data["feelsLike"],
            "humidity": weather_data["humidity"],
            "windSpeed": weather_data["windSpeed"],
            "windDirection": weather_data["windDirection"],
            "pressure": weather_data["pressure"],
            "visibility": weather_data["visibility"],
            "weatherCode": weather_data["weatherCode"],
            "isDay": weather_data["isDay"],
            "currentTime": weather_data["currentTime"],
            "sunrise": weather_data["sunrise"],
            "sunset": weather_data["sunset"],
            "uvIndex": weather_data["uvIndex"],
            "aqi": weather_data["aqi"],
            "pm2_5": weather_data["pm2_5"],
            "hourlyForecast": weather_data["hourlyForecast"],
            "forecast": weather_data["forecast"]
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        error_msg = str(e)
        status_code = 500
        if "timed out" in error_msg.lower():
            status_code = 504
            error_msg = "API request timed out. Please try again."
        return jsonify({"error": error_msg}), status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)
