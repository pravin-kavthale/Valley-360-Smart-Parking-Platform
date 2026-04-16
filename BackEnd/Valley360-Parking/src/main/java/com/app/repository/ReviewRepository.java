package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    boolean existsByBookingId(Long bookingId);

    @Query("SELECT r FROM Review r JOIN FETCH r.user u WHERE r.parkingArea.id = :parkingId ORDER BY r.createdAt DESC")
    List<Review> findByParkingAreaIdOrderByCreatedAtDesc(@Param("parkingId") Long parkingId);

    @Query("SELECT r FROM Review r WHERE r.parkingArea.id = :parkingId")
    List<Review> findAllByParkingAreaId(@Param("parkingId") Long parkingId);
}
