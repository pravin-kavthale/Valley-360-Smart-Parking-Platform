# Architecture (Detailed)

## Services

1. Frontend (`my-project`)
- React + Vite SPA
- Role-based dashboards and route protection
- Map UI and booking workflows

2. Backend (`BackEnd/Valley360-Parking`)
- Spring Boot REST API
- JWT authentication and role checks
- Business logic, persistence, and analytics aggregation

3. AI Service (`ai-service`)
- FastAPI microservice
- TextBlob sentiment scoring
- Security/cleanliness keyword detection for reviews

## Data and Request Flow

1. User interacts with frontend.
2. Frontend sends API call to backend.
3. Backend validates JWT and processes domain logic.
4. Backend reads/writes MySQL via JPA.
5. On review submission, backend calls AI service and stores enriched fields.
6. Frontend dashboards consume analytics endpoints.

## Non-Functional Notes

- Local dev uses split ports:
  - Frontend: 5173
  - Backend: 8080
  - AI service: 8000
- CORS and security policies are configured in backend and AI service.
