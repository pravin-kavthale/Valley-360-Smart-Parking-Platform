package com.app.service;

import com.app.dto.ReviewAnalysisRequest;
import com.app.dto.ReviewAnalysisResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**
 * Service for calling AI analysis service for review sentiment analysis
 * Handles integration with Python FastAPI service
 */
@Slf4j
@Service
public class ReviewAIService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${ai.service.url:http://localhost:8000}")
    private String aiServiceUrl;

    @Value("${ai.service.timeout:10000}")
    private Integer aiServiceTimeout;

    /**
     * Analyze review text using AI service
     * 
     * @param reviewText The review text to analyze
     * @return ReviewAnalysisResponse with sentiment and flags
     * @throws Exception if AI service is unavailable (logs but doesn't crash)
     */
    public ReviewAnalysisResponse analyzeReview(String reviewText) {
        try {
            if (reviewText == null || reviewText.trim().isEmpty()) {
                log.warn("Attempting to analyze empty review text");
                return getDefaultResponse("NEUTRAL");
            }

            ReviewAnalysisRequest request = ReviewAnalysisRequest.builder()
                    .text(reviewText)
                    .build();

            String endpoint = aiServiceUrl + "/analyze-review";
            log.info("Calling AI service at: {}", endpoint);

            ReviewAnalysisResponse response = restTemplate.postForObject(
                    endpoint,
                    request,
                    ReviewAnalysisResponse.class);

            if (response == null) {
                log.warn("AI service returned null response");
                return getDefaultResponse("NEUTRAL");
            }

            log.info("AI analysis successful - Sentiment: {}, Security: {}, Cleanliness: {}",
                    response.getSentimentLabel(),
                    response.getSecurityFlag(),
                    response.getCleanlinessFlag());

            return response;

        } catch (RestClientException e) {
            log.error("AI service unavailable or request failed: {}", e.getMessage());
            log.warn("Review will be saved without AI analysis. Manual analysis can be run later.");
            return null; // Return null so ReviewService can skip AI processing

        } catch (Exception e) {
            log.error("Unexpected error during review analysis", e);
            return null;
        }
    }

    /**
     * Get default response when AI service is unavailable
     */
    private ReviewAnalysisResponse getDefaultResponse(String sentiment) {
        return ReviewAnalysisResponse.builder()
                .sentimentLabel(sentiment)
                .sentimentScore(0.5)
                .securityFlag(false)
                .cleanlinessFlag(false)
                .analyzedAt(java.time.LocalDateTime.now().toString())
                .build();
    }

    /**
     * Check if AI service is healthy
     */
    public boolean isServiceHealthy() {
        try {
            String healthUrl = aiServiceUrl + "/health";
            restTemplate.getForObject(healthUrl, Object.class);
            return true;
        } catch (Exception e) {
            log.warn("AI service health check failed: {}", e.getMessage());
            return false;
        }
    }
}
