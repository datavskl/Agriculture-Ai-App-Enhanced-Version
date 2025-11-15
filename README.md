<div align="center">
<img width="1200" height="475" alt="GHBanner" src="" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/12X6yDfLatA9zvAlGb-dCk8XjUrzZKfPu

## Run Locally

**Prerequisites:**  Node.js

1. Change into the frontend workspace:
   `cd frontend`
2. Install dependencies:
   `npm install`
3. Create `.env.local` in the frontend directory and set `GEMINI_API_KEY` to your Gemini API key
4. Start the Vite dev server:
   `npm run dev`

## Project Structure

- `frontend/` – Vite + React application
- `backend/` – Express + TypeScript API server

## Backend API Server

A production-ready Express + TypeScript backend now lives in [`backend/`](backend). It aggregates all of the data that the Agriculture AI frontend consumes.

### Quick start

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

By default the API listens on `http://localhost:4000`. Update `ALLOWED_ORIGINS` in `.env` if you need to expose the server to additional domains.

### Available APIs

Refer to [`backend/README.md`](backend/README.md) for a full list of routes covering weather, farm management, market intelligence, task tracking, inventory, and analytics dashboards.

### Type checking

Run `npm run build` inside `backend/` to perform a strict type check of the project.
