# Lumina MERN Experience

Lumina is a premium full-stack MERN application with a Vite + React frontend, Tailwind CSS styling, Framer Motion interactions, and an Express + MongoDB backend.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Lucide React
- Backend: Node.js, Express, MongoDB, Mongoose

## Run Locally

1. Install root dependencies:

   ```bash
   npm install
   ```

2. Install app dependencies:

   ```bash
   npm --prefix client install
   npm --prefix server install
   ```

3. Create environment files:

   ```bash
   Copy-Item server/.env.example server/.env
   Copy-Item client/.env.example client/.env
   ```

4. Add your Mongo connection string to `server/.env` if you want POST submissions persisted.

5. Start both apps from the root:

   ```bash
   npm run dev
   ```

## Available Endpoints

- `GET /api/health`
- `GET /api/showcase`
- `POST /api/inquiries`

## Notes

- The frontend uses fallback showcase data if the API is unavailable.
- The server still starts if `MONGO_URI` is missing, but inquiry submissions return a database availability error until MongoDB is configured.
