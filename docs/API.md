# API Reference (Detailed)

This document contains the detailed endpoint inventory and usage notes for the Valley 360 Smart Parking Platform.

## Base URLs

- Backend API: `http://localhost:8080`
- AI Service API: `http://localhost:8000`

## Main API Groups

- Authentication (`/User/*`, `/Admin/*` login)
- User management (`/User/*`)
- Parking area and slots (`/parkingArea/*`, `/parkingSlots/*`)
- Booking and QR validation (`/booking/*`)
- Reviews and analytics (`/reviews/*`, `/owner/analytics/*`, `/admin/metrics/*`)
- AI review analysis (`/analyze-review`, `/health`, `/batch-health`)

## Interactive Docs

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI spec: `http://localhost:8080/v3/api-docs`

## Notes

- Many endpoints require JWT in `Authorization: Bearer <token>`.
- Public/read endpoints should be validated against `SecurityConfig` before exposing to production.
- Keep this file updated when adding or renaming controllers.
