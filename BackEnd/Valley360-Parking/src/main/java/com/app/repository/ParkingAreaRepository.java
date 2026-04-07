package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.ParkingArea;
import com.app.enums.Status;

public interface ParkingAreaRepository extends JpaRepository<ParkingArea, Long> {

	List<ParkingArea> findByStatus(Status status);
	
	
	List<ParkingArea> findByUserId(Long ownerId);
	
	@Modifying
	@Query("DELETE FROM ParkingArea pa WHERE pa.user.id = :ownerId")
	void deleteByUserId(Long ownerId);
}
