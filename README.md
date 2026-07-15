# SkyGlass Weather Dashboard

A premium, modern weather dashboard that features Apple + Microsoft Fluent + Glassmorphic aesthetics. Built using React + Vite on the frontend and Python Flask on the backend, integrated with Open-Meteo API services.

## Features
- **Dynamic Backdrop Layering**: Fullscreen scenery matching weather conditions (Sunny, Rain, Cloudy, Snow, Thunderstorm, Fog, Night).
- **Curated Cityscapes**: Automatically displays unique cityscape photography backgrounds for popular cities (London, Tokyo, Paris, Rome, Sydney, Cairo, Delhi, Chennai, Bangalore, Singapore, Dubai, etc.).
- **Calculated Sun Trajectory Curve**: Dynamically positions the sun icon on a dashed SVG path based on local sunrise/sunset coordinates.
- **Air Quality Gauge**: Visualizes US AQI levels and PM2.5 concentrations in a premium circular SVG meter.
- **Count-Up Number Animations**: Count animations on temperature and AQI readouts.
- **Dashed layout section dividers** matching premium mockup grids.
- **Responsive design** optimized for screens above 1440px (Desktop), 1200px (Laptop), 768px (Tablet), and Mobile stacks.

---

## Directory Structure
```
weather/
├── frontend/             # Vite + React (Tailwind CSS, Framer Motion)
│   ├── src/
│   │   ├── components/   # Modular glass UI units (AQI, Sunrise, Scenery, timeline)
│   │   ├── services/     # Axios client configuration
│   │   └── utils/        # Weather code translation maps
│   ├── tailwind.config.js
│   └── package.json
└── backend/              # Python Flask API
    ├── app.py            # API entry point & CORS
    ├── weather.py        # Open-Meteo forecast and AQI fetches
    └── requirements.txt  # Dependency listings (including Gunicorn)
```

---

## Local Development Setup

### 1. Backend (Flask)
Go to the `backend/` directory:
```bash
cd backend
```
Create a virtual environment (optional but recommended):
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```
Install dependencies:
```bash
pip install -r requirements.txt
```
Run the local server:
```bash
python app.py
```
*The local backend API runs on `http://127.0.0.1:5000/weather?city=London`.*

### 2. Frontend (Vite)
Go to the `frontend/` directory:
```bash
cd frontend
```
Install packages:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
*The local Vite development client runs on `http://localhost:5173/`.*

---

## Deployment Process

### Frontend Deployment (Vercel)
1. Commit and push the code to your GitHub repository.
2. Log into your [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Select your repository.
4. Set the following parameters:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
5. In **Environment Variables**, add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-render-app.onrender.com` (Your deployed Render backend URL)
6. Click **Deploy**.

### Backend Deployment (Render)
1. Log into your [Render Dashboard](https://render.com/) and click **New > Web Service**.
2. Connect your GitHub repository.
3. Set the following parameters:
   - **Name**: `weather-backend`
   - **Language**: `Python`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
4. Click **Create Web Service**.
