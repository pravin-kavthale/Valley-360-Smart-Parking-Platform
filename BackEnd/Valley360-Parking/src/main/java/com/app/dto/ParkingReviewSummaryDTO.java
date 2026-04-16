package com.app.dto;

public class ParkingReviewSummaryDTO {
    private double avgRating;
    private double avgCleanliness;
    private double avgSecurity;
    private double avgAccessibility;
    private long totalReviews;

    public double getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(double avgRating) {
        this.avgRating = avgRating;
    }

    public double getAvgCleanliness() {
        return avgCleanliness;
    }

    public void setAvgCleanliness(double avgCleanliness) {
        this.avgCleanliness = avgCleanliness;
    }

    public double getAvgSecurity() {
        return avgSecurity;
    }

    public void setAvgSecurity(double avgSecurity) {
        this.avgSecurity = avgSecurity;
    }

    public double getAvgAccessibility() {
        return avgAccessibility;
    }

    public void setAvgAccessibility(double avgAccessibility) {
        this.avgAccessibility = avgAccessibility;
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }
}
