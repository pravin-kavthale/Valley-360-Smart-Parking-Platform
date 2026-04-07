package com.app.service;

import java.util.List;
import java.util.stream.Collectors;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ParkingSlotDTO;
import com.app.entities.ParkingArea;
import com.app.entities.ParkingSlot;
import com.app.exception.UserNotFoundException;
import com.app.repository.ParkingAreaRepository;
import com.app.repository.ParkingSlotRepository;

@Service
@Transactional
public class ParkingSlotServiceImpl implements ParkingSlotService {

	@Autowired
	private ParkingSlotRepository parkingSlotRepository;
	
	@Autowired
	private ParkingAreaRepository parkingAreaRepository;
	
	@Autowired
	private BookingService bookingservice;
	
	@Autowired
	private ModelMapper mapper;
	
	@Transactional
	@Override
	public ParkingSlot addNewParkingSlot(ParkingSlotDTO slot) {
		
		ParkingArea area = parkingAreaRepository.findById(slot.getParkingId())
				.orElseThrow(() -> new UserNotFoundException("Invalid id !!"));
		
		ParkingSlot parkingSlot = mapper.map(slot, ParkingSlot.class);
		
		parkingSlot.setParking(area);
		
		return parkingSlotRepository.save(parkingSlot);
	}

//	@Override
//	public List<ParkingSlot> viewParkingSlot(Long id) {
////		ParkingArea area = parkingAreaRepository.findById(id).orElseThrow(() -> new ParkingNotFoundException("parking not found !!"));
//		
//		
//		return null;
//	}
	@Override
	public List<ParkingSlotDTO> getParkingSlotsByParkingArea(Long parkingAreaId) {
        ParkingArea parkingArea = parkingAreaRepository.findById(parkingAreaId)
                .orElseThrow(() -> new RuntimeException("Parking area not found"));

        return parkingArea.getParkingSlots().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ParkingSlotDTO convertToDTO(ParkingSlot parkingSlot) {
        ParkingSlotDTO dto = new ParkingSlotDTO();
        dto.setId(parkingSlot.getId());
        dto.setVehicleType(parkingSlot.getVehicleType());
        dto.setPrice(parkingSlot.getPrice());
        dto.setStatus(parkingSlot.getStatus());
        dto.setParkingId(parkingSlot.getParking().getId());
        return dto;
    }
    @Override
    public long countAllSlots() {
        return parkingSlotRepository.count();
    }

	@Override
	public List<ParkingSlotDTO> getParkingSlots() {
		
		List<ParkingSlot> parkingslot=parkingSlotRepository.findAll();
		
		return parkingslot.stream()
                .map(ParkingSlot -> mapper.map(ParkingSlot, ParkingSlotDTO.class))
                .collect(Collectors.toList());
	}
	
	@Override
	public List<ParkingSlotDTO> getAllParkingSlotsSorted(String sortBy) {
	    List<ParkingSlot> parkingSlots;
	    if ("price".equalsIgnoreCase(sortBy)) {
	    	parkingSlots = parkingSlotRepository.findAllSortedByPriceAsc();
	    } else {
	    	parkingSlots = parkingSlotRepository.findAllByOrderByCityAsc();
	    }
	    return parkingSlots.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}

	@Transactional
	@Override
	public void deleteByAreaID(Long id) {
		
		
		List<ParkingSlot> slot=parkingSlotRepository.findByParkingArea(id);
		
		for (ParkingSlot parkingSlot : slot) {
			System.out.println("sdfghjkl");
			bookingservice.DeleteBySlotId(parkingSlot.getId());
		}
		if(slot!=null) {
			System.out.println("In delete Slot");
		parkingSlotRepository.deleteByParkingId(id);
		}
	}


}


