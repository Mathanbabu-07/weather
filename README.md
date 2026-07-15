# 🌦️ Weather Application

A modern, responsive weather application built using **React + Vite** and **Flask**, powered by the **Open-Meteo API**. The application provides real-time weather information and forecasts for cities worldwide with a dynamic weather-based user interface.

---

## 🚀 Features

- 🔍 Search weather by city (Worldwide)
- 🌡️ Current temperature
- 💧 Humidity
- 🌬️ Wind speed
- ☁️ Weather condition with icons
- 📅 Multi-day weather forecast
- 🎨 Dynamic animated background based on live weather
- 💾 Last searched city saved using Local Storage
- ⚠️ Error handling for invalid cities and API failures
- 📱 Responsive design for desktop, tablet, and mobile

---

# 🛠️ Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Flask
- Flask-CORS
- Requests

### Weather API
- Open-Meteo Forecast API
- Open-Meteo Geocoding API

---

# 📂 Project Structure

```
weather-app/

├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py
│   ├── weather.py
│   ├── requirements.txt
│   └── .env (optional)
│
└── README.md
```

---

# ⚙️ Installation & Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-app.git

cd weather-app
```

---

## 2. Backend Setup (Flask)

Navigate to backend:

```bash
cd backend
```

Create virtual environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run Flask server

```bash
python app.py
```

Backend runs at

```
http://localhost:5000
```

---

## 3. Frontend Setup (React + Vite)

Open another terminal

```bash
cd frontend
```

Install packages

```bash
npm install
```

Start development server

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🌐 Environment Variables

Create a `.env` file inside the frontend directory.

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://your-render-backend.onrender.com
```

---

# 🚀 Build for Production

Frontend

```bash
npm run build
```

Backend

```bash
gunicorn app:app
```

---

# 📦 Deployment

### Frontend

Deploy on **Vercel**

### Backend

Deploy on **Render**

---

# 📌 Assumptions Made

- Internet connection is available to fetch live weather data.
- Open-Meteo API services are online and accessible.
- City names entered by users are valid and supported by the Open-Meteo Geocoding API.
- Users allow their browser to store Local Storage data for remembering the last searched city.
- Weather information depends on the accuracy of the Open-Meteo data source.

---

# ⚠️ Known Limitations

- Weather data availability depends on the Open-Meteo API.
- Search is based on city names and may return the closest matching location for ambiguous names.
- The free hosting tier for the Flask backend (Render) may introduce a short delay if the service has been idle.
- The application currently supports weather search by city only and does not include user authentication or favorites.

---

# 🤖 AI Usage Disclosure

## AI Tools Used

The following AI tools were used during the development process:

- ChatGPT (OpenAI)
- Cursor AI

---

## Tasks Assisted by AI

AI was used to assist with:

- Project planning and architecture
- React component organization
- Flask backend structure
- API integration guidance for Open-Meteo
- UI/UX design suggestions
- Dynamic weather background ideas
- Error handling recommendations
- README documentation preparation

---

## Code Written Independently

The following work was implemented and customized independently:

- React application setup and component integration
- Flask API implementation and endpoint configuration
- Frontend-to-backend communication
- Weather data rendering logic
- Responsive UI adjustments
- Local storage implementation
- Project deployment configuration using Vercel and Render
- Debugging, testing, and final integration

---

## Independent Technical Decision

One independent technical decision was choosing the deployment architecture:

- **Frontend:** Vercel
- **Backend:** Render

This approach provides fast static hosting for the React application while allowing the Flask backend to run as a dedicated web service, resulting in a clean separation between frontend and backend with straightforward deployment.

---

# 📄 License

This project was developed as a **Minor Project** for educational purposes.

---
