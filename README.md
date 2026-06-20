# Task Manager

A full-stack MERN task manager — React, Express, MongoDB, with JWT auth.

## Features
- Sign up / log in with hashed passwords (bcrypt) and JWT sessions
- Create, complete, and delete tasks
- Tasks are private — each user only sees their own
- Dockerized, ready to deploy

## Run locally (without Docker)

**Backend**
```
cd server
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev
```

**Frontend**
```
cd client
cp .env.example .env
npm install
npm run dev
```

## Run with Docker
```
docker compose up --build
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## Tech stack
- **Frontend:** React, React Router, Tailwind CSS, Vite
- **Backend:** Express, Mongoose, JWT, bcrypt, Helmet
- **Database:** MongoDB
