package com.app.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ReviewRequestDTO {

    @NotNull(message = "bookingId is required")
    private Long bookingId;

    @Min(value = 1, message = "rating must be between 1 and 5")
    @Max(value = 5, message = "rating must be between 1 and 5")
    private int rating;

    @Min(value = 1, message = "cleanliness must be between 1 and 5")
    @Max(value = 5, message = "cleanliness must be between 1 and 5")
    private int cleanliness;

    @Min(value = 1, message = "security must be between 1 and 5")
    @Max(value = 5, message = "security must be between 1 and 5")
    private int security;

    @Min(value = 1, message = "accessibility must be between 1 and 5")
    @Max(value = 5, message = "accessibility must be between 1 and 5")
    private int accessibility;

    @Size(max = 500, message = "comment must be at most 500 characters")
    private String comment;

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getCleanliness() {
        return cleanliness;
    }

    public void setCleanliness(int cleanliness) {
        this.cleanliness = cleanliness;
    }

    public int getSecurity() {
        return security;
    }

    public void setSecurity(int security) {
        this.security = security;
    }

    public int getAccessibility() {
        return accessibility;
    }

    public void setAccessibility(int accessibility) {
        this.accessibility = accessibility;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
