package com.app.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	Optional<Booking> findByQrToken(String qrToken);

	// @Query("SELECT b FROM Booking b WHERE b.parkingSlot.parking.user.id =
	// :ownerId AND b.date = :date")
	@Query("SELECT b FROM Booking b JOIN FETCH b.user JOIN FETCH b.parkingSlot ps JOIN FETCH ps.parking p WHERE p.user.id = :ownerId AND b.bookingDate = :date")
	List<Booking> findTodaysBookingsByOwnerId(Long ownerId, LocalDate date);

	// @Query("SELECT b FROM Booking b JOIN FETCH b.user JOIN FETCH b.parkingSlot ps
	// WHERE b.bookingDate = :date AND ps.user.id = :ownerId")
	// List<Booking> findTodaysBookingsByOwnerId( Long ownerId, LocalDate date);

	// @Query("SELECT b FROM Booking b WHERE b.parkingSlot.parking.user.id =
	// :ownerId AND b.date < :date")
	@Query("SELECT b FROM Booking b JOIN FETCH b.user JOIN FETCH b.parkingSlot ps JOIN FETCH ps.parking p WHERE p.user.id = :ownerId AND b.departureDate < :date")
	List<Booking> findPreviousBookingsByOwnerId(Long ownerId, LocalDateTime date);

	@Modifying
	@Query("DELETE FROM Booking b WHERE b.parkingSlot.id = :parkingSlotId")
	void deleteBookingsByParkingSlotId(Long parkingSlotId);

	@Query("Select b FROM Booking b WHERE b.parkingSlot.id=:parking_slot_id ")
	List<Booking> findAllbyParkingSlotId(Long parking_slot_id);

	@Query("SELECT b FROM Booking b JOIN FETCH b.user u JOIN FETCH b.parkingSlot ps JOIN FETCH ps.parking p WHERE u.id = :userId ORDER BY COALESCE(b.startTime, b.arrivalDate) DESC, b.id DESC")
	List<Booking> findByUserIdOrderByLatest(@Param("userId") Long userId);

	@Query("SELECT b FROM Booking b JOIN FETCH b.user u JOIN FETCH b.parkingSlot ps JOIN FETCH ps.parking p WHERE ps.id = :slotId ORDER BY COALESCE(b.startTime, b.arrivalDate) ASC, b.id ASC")
	List<Booking> findTimelineBySlotId(@Param("slotId") Long slotId);
}
