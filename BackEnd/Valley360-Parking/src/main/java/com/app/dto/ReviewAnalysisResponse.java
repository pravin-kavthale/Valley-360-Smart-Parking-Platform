package com.app.dto;

import lombok.*;

/**
 * DTO for review analysis response from AI service
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewAnalysisResponse {
    private String sentimentLabel; // POSITIVE, NEUTRAL, NEGATIVE
    private Double sentimentScore; // 0.0 to 1.0
    private Boolean securityFlag;
    private Boolean cleanlinessFlag;
    private String analyzedAt;
}
