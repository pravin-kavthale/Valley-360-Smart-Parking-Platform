# Deployment Guide

## Local Development Deployment

1. Start MySQL and create database `valley`.
2. Start backend (`mvnw spring-boot:run`).
3. Start AI service (`uvicorn main:app --host 0.0.0.0 --port 8000 --reload`).
4. Start frontend (`npm run dev`).

## Environment Configuration

Recommended variables:

- Backend: datasource, JWT, AI service URL
- Frontend: API base URL (`VITE_API_BASE_URL`)
- AI service: service port and optional CORS values

## Production Recommendations

- Containerize frontend/backend/AI service.
- Use managed MySQL with secret-backed credentials.
- Terminate TLS at gateway/reverse proxy.
- Enable centralized logging and monitoring.
- Add CI/CD for lint, tests, and release pipelines.

## Release Checklist

- Build backend artifact and frontend static bundle.
- Run smoke tests for login, booking, and review flows.
- Verify Swagger/OpenAPI endpoint accessibility.
- Verify AI service connectivity from backend.
