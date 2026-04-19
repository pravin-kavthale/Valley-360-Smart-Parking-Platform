package com.app.dto;

import lombok.*;

/**
 * DTO for review analysis request from AI service
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewAnalysisRequest {
    private String text;
}
