# Database Schema (Detailed)

This document tracks the relational data model for the Valley 360 Smart Parking Platform.

## Core Entities

- `User`
- `Role`
- `ParkingArea`
- `ParkingSlot`
- `Booking`
- `Review`
- `OwnerMetrics`

## Relationship Summary

- One owner -> many parking areas
- One parking area -> many parking slots
- One customer -> many bookings
- One parking slot -> many bookings over time
- One parking area -> many reviews
- One owner -> one metrics aggregate record

## Migration and Evolution

- Flyway-style script exists in backend resources:
  - `V1_2__add_ai_review_analysis.sql`

## Notes

- Current backend uses JPA auto update (`spring.jpa.hibernate.ddl-auto=update`) for local evolution.
- For production, prefer explicit migration scripts and strict schema versioning.
