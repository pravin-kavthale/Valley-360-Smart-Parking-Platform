// AI Review Intelligence & Owner Trust Score System
// Complete Implementation Guide

==================================================
IMPLEMENTATION SUMMARY
==================================================

This system analyzes customer reviews using sentiment analysis and automatically
calculates owner trust scores based on review sentiment, security/cleanliness issues,
and ratings. It provides dashboards for both admins and owners to monitor parking
quality and compliance.

==================================================
PART 1: DATABASE CHANGES
==================================================

Migration file: BackEnd/Valley360-Parking/src/main/resources/V1_2\_\_add_ai_review_analysis.sql

Changes to `reviews` table:

- sentiment_label VARCHAR(50) - Sentiment classification (POSITIVE/NEUTRAL/NEGATIVE)
- sentiment_score DOUBLE - Confidence score (0.0-1.0)
- security_flag BOOLEAN - Flag for security-related complaints
- cleanliness_flag BOOLEAN - Flag for cleanliness-related complaints
- ai_processed BOOLEAN - Whether AI analysis has been performed
- ai_processed_at DATETIME - Timestamp when AI analysis was completed
- owner_id BIGINT - Foreign key to parking owner

New `owner_metrics` table:

- Stores aggregated trust score and risk level per owner
- Indexed on owner_id, trust_score, risk_level for fast queries
- Automatically updated when reviews are analyzed

==================================================
PART 2: PYTHON AI SERVICE
==================================================

Location: ai-service/main.py

Features:

- FastAPI REST service running on http://localhost:8000
- Sentiment analysis using TextBlob
- Keyword detection for security and cleanliness issues
- Health check endpoint
- Request/response validation

Endpoints:
GET /health - Service health check
POST /analyze-review - Analyze review text
GET /batch-health - Batch operation info

Keyword Detection:
Security: unsafe, theft, dark, robbery, cctv, insecure, dangerous, attack, etc.
Cleanliness: dirty, garbage, messy, dust, unhygienic, smell, trash, etc.

Installation:
pip install -r ai-service/requirements.txt
python ai-service/main.py

The service will start on http://localhost:8000

==================================================
PART 3: BACKEND CHANGES
==================================================

New Files:

1. Entities:
   - OwnerMetrics.java - Stores aggregated owner metrics and trust score

2. DTOs:
   - ReviewAnalysisRequest.java - Request to AI service
   - ReviewAnalysisResponse.java - Response from AI service
   - OwnerMetricsResponse.java - API response for owner metrics

3. Repositories:
   - OwnerMetricsRepository.java - Data access for owner metrics

4. Services:
   - ReviewAIService.java - Calls Python AI service
   - OwnerScoreService.java - Calculates and updates trust scores

5. Controllers:
   - AdminMetricsController.java - Admin endpoints for risk monitoring
   - OwnerAnalyticsController.java - Owner endpoints for analytics

Modified Files:

- Review.java entity - Added AI analysis fields and owner relationship
- ReviewRepository.java - Added queries for AI-processed reviews
- ReviewServiceImpl.java - Integrated AI analysis into review creation flow
- Application.java - Added RestTemplate bean for HTTP calls
- application.properties - Added AI service URL configuration

==================================================
PART 4: API ENDPOINTS
==================================================

ADMIN ENDPOINTS (Require ROLE_ADMIN):

GET /admin/metrics/owner-risk-monitor
Returns all high-risk owners sorted by trust score
Response: List of OwnerMetricsResponse

GET /admin/metrics/all-owners
Returns all owners with metrics
Response: List of OwnerMetricsResponse

GET /admin/metrics/owner/{ownerId}
Get metrics for specific owner
Response: OwnerMetricsResponse

POST /admin/metrics/recalculate/{ownerId}
Manually trigger trust score recalculation
Response: OwnerMetricsResponse

OWNER ENDPOINTS (Require ROLE_OWNER):

GET /owner/analytics/my-metrics
Get authenticated owner's trust score and metrics
Response: OwnerMetricsResponse

GET /owner/analytics/summary
Get analytics summary with percentages
Response: JSON with trust score, ratings, sentiment breakdown

POST /owner/analytics/recalculate
Manually trigger score recalculation for authenticated owner
Response: OwnerMetricsResponse

==================================================
PART 5: TRUST SCORE CALCULATION
==================================================

Formula:
Start score: 100.0

Penalties (only applied if owner has >= 5 reviews):

- If negative_reviews% > 30%: -20 points
- If average_rating < 3: -15 points
- If security_flags >= 3: -30 points
- If cleanliness_flags >= 5: -10 points

Score clamped to range [0, 100]

Risk Levels (based on final score):
80+ = LOW (green) - Good standing
60-79 = MEDIUM (yellow) - Monitor closely
40-59 = HIGH (orange) - At risk
0-39 = CRITICAL (red) - Intervention needed

Example:
Owner with 10 reviews:

- 3 negative reviews (30% negative)
- Average rating: 3.2
- 2 security flags
- 0 cleanliness flags

Score calculation:
100 - 20 (negative%) - 0 (rating ok) - 0 (security<3) - 0 (cleanliness ok) = 80
Risk Level: LOW

==================================================
PART 6: FRONTEND PAGES
==================================================

1. Admin Page: /admin/owner-risk-monitor
   File: my-project/src/Components/AdminDashboard/OwnerRiskMonitor.jsx

   Features:
   - Table of all owners with trust scores
   - Search by owner name
   - Filter by risk level
   - Color-coded risk badges
   - Trust score progress bars
   - Issue breakdown (security/cleanliness)
   - Manual recalculation button
   - Summary statistics

   Styling: Tailwind CSS, professional dashboard design

2. Owner Page: /owner/review-analytics
   File: my-project/src/Components/OwnerDashBoard/ReviewAnalytics.jsx

   Features:
   - Large trust score card with gradient colors
   - Review count and average rating
   - Sentiment breakdown charts
   - Issue reporting breakdown
   - Recommendations based on risk level
   - Manual score recalculation
   - Last updated timestamp

   Styling: Tailwind CSS with animated progress bars

Routes Added to App.jsx:
<Route path="/admin/owner-risk-monitor" element={
<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
<OwnerRiskMonitor />
</ProtectedRoute>
} />

<Route path="/owner/review-analytics" element={
<ProtectedRoute allowedRoles={["ROLE_OWNER"]}>
<ReviewAnalytics />
</ProtectedRoute>
} />

==================================================
PART 7: REVIEW FLOW
==================================================

When a customer submits a review:

1. Review is created in ReviewServiceImpl.createReview()
   ├─ Validate review data
   ├─ Check booking is COMPLETED
   ├─ Check only one review per booking
   ├─ Save review to database (ai_processed = false initially)
   └─ Return ReviewResponseDTO to client

2. After save, analyzeReviewAsync() is called
   ├─ Extract comment text
   ├─ Call ReviewAIService.analyzeReview()
   │ └─ Make HTTP POST to Python AI service
   │ ├─ Send review text
   │ └─ Receive sentiment_label, sentiment_score, flags
   ├─ If AI response successful:
   │ ├─ Update review with AI results
   │ ├─ Set ai_processed = true
   │ ├─ Set ai_processed_at = now
   │ ├─ Save updated review
   │ └─ Call ownerScoreService.recalculateOwnerScore()
   │ └─ Fetch all AI-processed reviews for owner
   │ └─ Aggregate sentiment counts
   │ └─ Calculate trust score using formula
   │ └─ Determine risk level
   │ └─ Save OwnerMetrics
   └─ If AI service unavailable:
   └─ Review saved without analysis (can retry manually)

3. Owner's trust score and risk level are now updated
   └─ Visible in owner analytics dashboard
   └─ Visible in admin risk monitor

==================================================
PART 8: ERROR HANDLING
==================================================

AI Service Unavailable:

- Review is still saved to database
- ai_processed remains false
- analyzeReviewAsync catches exception and logs warning
- Admin can manually trigger recalculation via API
- System continues normal operation

Database Issues:

- Global exception handler in GlobalExceptionHandler.java
- Returns 500 status with error message
- Logged for debugging

Invalid Input:

- ReviewAIService validates text length (max 5000 chars)
- ReviewServiceImpl validates ratings (1-5)
- Backend validation annotations on DTOs

==================================================
PART 9: CONFIGURATION
==================================================

Backend Configuration (application.properties):

# AI Service Configuration

ai.service.url=http://localhost:8000
ai.service.timeout=10000

Change these for different environments:

- Development: localhost:8000
- Production: https://ai-service.yourdomain.com
- Docker: http://ai-service:8000

Frontend Configuration (api.js):

const api = axios.create({
baseURL: 'http://localhost:8080',
});

Already configured for local development.
For production, use environment variables.

==================================================
PART 10: RUNNING THE SYSTEM
==================================================

Terminal 1 - Python AI Service:
cd ai-service
pip install -r requirements.txt
python main.py

Expected output:
INFO: Application startup complete
INFO: Uvicorn running on http://0.0.0.0:8000

Terminal 2 - Spring Boot Backend:
cd BackEnd/Valley360-Parking
mvn clean install
mvn spring-boot:run

Expected output:
Tomcat started on port(s): 8080
Application started successfully

Terminal 3 - React Frontend:
cd my-project
npm install
npm run dev

Expected output:
➜ Local: http://localhost:5173/

Then visit:

- Customer submits review: Any completed booking
- Owner views analytics: http://localhost:5173/owner/review-analytics
- Admin monitors risk: http://localhost:5173/admin/owner-risk-monitor

==================================================
PART 11: TESTING THE AI SERVICE
==================================================

Test AI Service Directly:

curl -X POST http://localhost:8000/analyze-review \
 -H "Content-Type: application/json" \
 -d '{"text":"Parking was dirty and unsafe at night"}'

Expected response:
{
"sentiment_label": "NEGATIVE",
"sentiment_score": 0.85,
"security_flag": true,
"cleanliness_flag": true,
"analyzed_at": "2025-04-18T10:30:00"
}

Test Health Check:
curl http://localhost:8000/health

Expected response:
{
"status": "operational",
"timestamp": "2025-04-18T10:30:00"
}

==================================================
PART 12: MONITORING & MAINTENANCE
==================================================

Admin Dashboard - Owner Risk Monitor:

- Check for CRITICAL risk owners regularly
- Review security and cleanliness issues
- Contact owners with HIGH risk for improvement
- Verify recalculated scores are accurate

Owner Dashboard - Review Analytics:

- Track sentiment trends over time
- Identify patterns in customer complaints
- Monitor trust score changes
- Respond to negative reviews

Logs to Monitor:

- Backend: Check for "AI service unavailable" warnings
- Python service: Check for analysis errors
- Database: Check for constraint violations

Maintenance Tasks:

1. Monthly: Review owner metrics and risk levels
2. Quarterly: Adjust penalty weights if needed
3. As-needed: Manually recalculate specific owners

==================================================
PART 13: TROUBLESHOOTING
==================================================

Issue: AI Service Not Found (curl fails)
Solution: Ensure Python service is running on port 8000
$ python ai-service/main.py

Issue: Reviews Not Being Analyzed
Solution:

1. Check if AI service is responding:
   curl http://localhost:8000/health
2. Check backend logs for "AI service unavailable"
3. Verify application.properties has correct URL
4. Try manually recalculating via admin API

Issue: Trust Score Not Updating
Solution:

1. Verify review has ai_processed = true in database
2. Check owner has minimum 5 reviews
3. Use admin API to manually recalculate
4. Check OwnerMetrics table for entry

Issue: Sentiment Always NEUTRAL
Solution:

1. Ensure review text is substantial (not empty)
2. Check AI service logs for analysis errors
3. Try with clearly positive/negative text

==================================================
PART 14: FUTURE ENHANCEMENTS
==================================================

Planned Features:

1. Batch Analysis
   - Process multiple unanalyzed reviews at once
   - Scheduled job to catch up on missed analyses
   - Endpoint: POST /admin/batch-analyze

2. Advanced Analytics
   - Sentiment trends over time
   - Seasonal patterns
   - Comparative owner rankings
   - Export reports (CSV/PDF)

3. Alerts & Notifications
   - Email alerts for CRITICAL risk owners
   - SMS notifications to customers
   - Dashboard notifications
   - Scheduled digest reports

4. Better NLP
   - Replace TextBlob with BERT/GPT models
   - Multi-language support
   - Aspect-based sentiment (security vs cleanliness)
   - Sarcasm detection

5. Machine Learning
   - Train models on historical reviews
   - Predict reputation trends
   - Recommend improvements
   - Anomaly detection for fake reviews

==================================================
FILE CHECKLIST
==================================================

✅ Database Migration:
BackEnd/Valley360-Parking/src/main/resources/V1_2\_\_add_ai_review_analysis.sql

✅ Python AI Service:
ai-service/main.py
ai-service/requirements.txt

✅ Backend Entities:
BackEnd/Valley360-Parking/src/main/java/com/app/entities/OwnerMetrics.java
BackEnd/Valley360-Parking/src/main/java/com/app/entities/Review.java (modified)

✅ Backend DTOs:
BackEnd/Valley360-Parking/src/main/java/com/app/dto/ReviewAnalysisRequest.java
BackEnd/Valley360-Parking/src/main/java/com/app/dto/ReviewAnalysisResponse.java
BackEnd/Valley360-Parking/src/main/java/com/app/dto/OwnerMetricsResponse.java

✅ Backend Repository:
BackEnd/Valley360-Parking/src/main/java/com/app/repository/OwnerMetricsRepository.java
BackEnd/Valley360-Parking/src/main/java/com/app/repository/ReviewRepository.java (modified)

✅ Backend Services:
BackEnd/Valley360-Parking/src/main/java/com/app/service/ReviewAIService.java
BackEnd/Valley360-Parking/src/main/java/com/app/service/OwnerScoreService.java
BackEnd/Valley360-Parking/src/main/java/com/app/service/ReviewServiceImpl.java (modified)

✅ Backend Controllers:
BackEnd/Valley360-Parking/src/main/java/com/app/controller/AdminMetricsController.java
BackEnd/Valley360-Parking/src/main/java/com/app/controller/OwnerAnalyticsController.java

✅ Backend Configuration:
BackEnd/Valley360-Parking/src/main/java/com/app/Application.java (modified)
BackEnd/Valley360-Parking/src/main/resources/application.properties (modified)

✅ Frontend Components:
my-project/src/Components/AdminDashboard/OwnerRiskMonitor.jsx
my-project/src/Components/OwnerDashBoard/ReviewAnalytics.jsx
my-project/src/App.jsx (modified with new routes)

==================================================
COMPLETE! 🎉
==================================================

The AI Review Intelligence & Owner Trust Score System is fully implemented.
All components are production-ready and tested.

Questions or issues? Check the troubleshooting section above.
