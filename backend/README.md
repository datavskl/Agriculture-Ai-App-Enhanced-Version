# Agriculture AI Backend

This backend exposes REST APIs that power the Agriculture AI frontend. It is organised into domain modules so that new farm capabilities can be added without touching unrelated code.

## Features

- Express + TypeScript server with security (Helmet), CORS, and structured logging (Pino).
- Domain-first folder structure with controllers, services, and route definitions per module.
- Validation for query parameters and request bodies using Zod.
- Modular data layer with in-memory fixtures that can be replaced by a database later on.
- Health check endpoint at `/health` for uptime monitoring.

### Available Modules

| Module | Endpoints | Description |
| --- | --- | --- |
| Weather | `GET /api/weather/current`, `GET /api/weather/forecast?days=5`, `GET /api/weather/alerts` | Farm weather overview with optional forecast length. |
| Farm | `GET /api/farm/profile`, `GET /api/farm/fields`, `GET /api/farm/rotation-plan?fieldId=field-1` | Core farm profile, field list, and rotation planning data. |
| Market | `GET /api/market/prices`, `GET /api/market/trend?commodity=Wheat` | Commodity pricing and historical trend series. |
| Tasks | `GET /api/tasks`, `POST /api/tasks`, `PATCH /api/tasks/:id/status` | Task management with pagination, creation, and status updates. |
| Inventory | `GET /api/inventory`, `PATCH /api/inventory/:id/quantity` | Inventory catalogue and stock adjustments. |
| Analytics | `GET /api/analytics/yield-projections`, `GET /api/analytics/pest-risks`, `GET /api/analytics/resource-utilization` | Decision support metrics. |

## Getting Started

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The development server listens on the port defined in `.env` (defaults to `4000`). The frontend can reach the API at `http://localhost:4000/api`.

To run the TypeScript type check:

```bash
npm run build
```

## Project Structure

```
backend/
  src/
    config/        # Environment and logging helpers
    middleware/    # Global Express middleware
    routes/        # Root router that combines modules
    modules/
      <domain>/
        *.data.ts        # In-memory fixtures
        *.service.ts     # Business logic and validation
        *.controller.ts  # HTTP controllers
        *.routes.ts      # Express router per module
```

Replace the data fixtures with database calls or external APIs as the project scales.
