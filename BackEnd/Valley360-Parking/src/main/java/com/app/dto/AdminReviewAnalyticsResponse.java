package com.app.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminReviewAnalyticsResponse {
    private Integer totalReviews;
    private Double positivePercent;
    private Double negativePercent;
    private Double neutralPercent;
    private Double avgRating;
    private List<String> topComplaints;
}
