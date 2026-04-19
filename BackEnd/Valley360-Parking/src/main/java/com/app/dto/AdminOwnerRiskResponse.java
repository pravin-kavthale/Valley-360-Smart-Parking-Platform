package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminOwnerRiskResponse {
    private Long ownerId;
    private String ownerName;
    private Double trustScore;
    private String riskLevel;
    private Integer totalReviews;
    private Double negativePercent;
    private Integer securityComplaints;
    private String trend;
    private String suggestedAction;
}
