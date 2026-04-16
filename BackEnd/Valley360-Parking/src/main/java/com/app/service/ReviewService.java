package com.app.service;

import java.util.List;

import com.app.dto.ParkingReviewSummaryDTO;
import com.app.dto.ReviewRequestDTO;
import com.app.dto.ReviewResponseDTO;

public interface ReviewService {

    ReviewResponseDTO createReview(ReviewRequestDTO request);

    List<ReviewResponseDTO> getReviewsForParkingArea(Long parkingId);

    ParkingReviewSummaryDTO getParkingReviewSummary(Long parkingId);
}
