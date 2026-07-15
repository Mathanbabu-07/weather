import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // 20s timeout to allow combined Open-Meteo + AQI fetches to return safely
});

export const fetchWeather = async (city) => {
  try {
    const response = await api.get(`/weather`, {
      params: { city }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Backend returned error (e.g. 404 City not found)
      throw new Error(error.response.data.error || 'Server error occurred');
    } else if (error.request) {
      // Network error or timeout
      throw new Error('Network error. Make sure the backend server is running.');
    } else {
      throw new Error(error.message);
    }
  }
};

export default api;
