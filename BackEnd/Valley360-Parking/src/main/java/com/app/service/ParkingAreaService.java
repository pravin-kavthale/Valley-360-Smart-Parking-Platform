package com.app.service;

import java.util.List;

import com.app.dto.ParkingAreaDTO;
import com.app.entities.ParkingArea;
import com.app.enums.Status;

public interface ParkingAreaService {
	
	ParkingArea addParkingArea(ParkingAreaDTO parking);
	
	List<ParkingAreaDTO> findNearbyParking(double lon, double lat, double radius);
	
	List<ParkingAreaDTO> findParkingAreaByStatus(Status status);
	
	public long countAllAreas();
	
	List<ParkingAreaDTO> getParkingarea();
	
	
	List<ParkingArea>  getParkingAreas(Long ownerId);

	ParkingArea getByParkingId(Long id);

	ParkingArea updateParkingArea(Long id, ParkingArea area);
	
	void deleteByOwnerid(Long id);
}
