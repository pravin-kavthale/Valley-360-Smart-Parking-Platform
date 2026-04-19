package com.app.dto;

import lombok.*;
import java.time.LocalDateTime;

/**
 * DTO for owner metrics response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerMetricsResponse {
    private Long ownerId;
    private String ownerName;
    private Integer totalReviews;
    private Integer positiveReviews;
    private Integer neutralReviews;
    private Integer negativeReviews;
    private Integer securityFlags;
    private Integer cleanlinessFlags;
    private Double averageRating;
    private Double trustScore;
    private String riskLevel;
    private LocalDateTime updatedAt;

    // Helper fields for analytics
    private Double negativePercentage;
    private Double positivePercentage;
    private Double neutralPercentage;
}
