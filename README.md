# AgriData – Post-Harvest Agricultural Data Tracking System

A full-stack mobile-first MVP Progressive Web App (PWA) for agricultural vendors to capture and manage post-harvest batch data. Built using the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, Multer, JWT

## Prerequisites
- Node.js installed
- MongoDB URI (local or Atlas)

## Project Setup

### 1. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
npm install
```

Configure Environment Variables:
Ensure the `.env` file in `backend/` has the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=supersecretjwtkey123
NODE_ENV=development
```

Run Seed Script (Populate users):
```bash
node seed.js
```

Start the Backend Server:
```bash
npm start # or node server.js
```
*The API will run at http://localhost:5000*

### 2. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Start the Frontend Dev Server:
```bash
npm run dev
```
*The app will run at http://localhost:5173*

## Test Credentials
The database has been seeded with the following test accounts:
- **Admin:** `admin@agridata.com` / `admin123`
- **Vendor:** `vendor@agridata.com` / `vendor123`

## Features Included
- JWT Authentication & Role-based Access (Vendor/Admin)
- Mobile-first, green agricultural theme UI with Tailwind
- Upload batch images locally using Multer
- Capture GPS coordinates via browser geolocation API
- Dashboard Statistics & CSV Data Export for Admins
