package com.app.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;



import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.BookingDTO;
import com.app.entities.Booking;
import com.app.entities.ParkingSlot;
import com.app.entities.User;
import com.app.exception.ParkingNotFoundException;
import com.app.exception.UserNotFoundException;
import com.app.repository.BookingRepository;
import com.app.repository.ParkingSlotRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ParkingSlotRepository parkingSlotRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public void bookParkingSlot(BookingDTO booking) {
		System.out.println(booking.getId());
		System.out.println(booking.getCustomer_id());
		System.out.println(booking.getParking_slot_id());
		User user = userRepo.findById(booking.getCustomer_id())
				.orElseThrow(() -> new UserNotFoundException("Invalid id !!"));
		
		ParkingSlot parkingSlot = parkingSlotRepo.findById(booking.getParking_slot_id())
				.orElseThrow(() -> new ParkingNotFoundException("Invalid id !!"));
		
		
		Booking book = mapper.map(booking, Booking.class);
		System.out.println(book.getId());
		book.setUser(user);
		book.setParkingSlot(parkingSlot);
		
		bookingRepo.save(book);
		
	}

	@Override
	public List<Booking> viewBookingHistory(Long id) {
		bookingRepo.findById(id);
		return null;
	}

//	@Override
//	public List<BookingDTO> getTodaysBookings(Long ownerId) {
//	    LocalDate today = LocalDate.now();
//	    List<Booking> bookings = bookingRepo.findTodaysBookingsByOwnerId(ownerId, today);
//	    return bookings.stream().map(book -> mapper.map(book, BookingDTO.class))
//                .collect(Collectors.toList());
//	}
	@Override
	public List<BookingDTO> getTodaysBookings(Long ownerId) {
        LocalDate today = LocalDate.now();
        List<Booking> bookings = bookingRepo.findTodaysBookingsByOwnerId(ownerId, today);
        return bookings.stream().map(book -> {
            BookingDTO dto = mapper.map(book, BookingDTO.class);
            dto.setCustomer_id(book.getUser() != null ? book.getUser().getId() : null);
            dto.setParking_slot_id(book.getParkingSlot() != null ? book.getParkingSlot().getId() : null);
            return dto;
        }).collect(Collectors.toList());
	}
        
	@Override
	public List<BookingDTO> getPreviousBookings(Long ownerId) {
		LocalDateTime today = LocalDateTime.now();
	    List<Booking> bookings = bookingRepo.findPreviousBookingsByOwnerId(ownerId, today);
//	    return bookings.stream().map(book -> mapper.map(book, BookingDTO.class))
//                .collect(Collectors.toList());
	    
	    return bookings.stream().map(book -> {
	    	BookingDTO dto = mapper.map(book, BookingDTO.class);
	    	dto.setCustomer_id(book.getUser() != null ? book.getUser().getId() : null);
            dto.setParking_slot_id(book.getParkingSlot() != null ? book.getParkingSlot().getId() : null);
            return dto;
	    }).collect(Collectors.toList());
	}

	@Transactional
	@Override
	public void DeleteBySlotId(Long id) {
		
		List<Booking> b=bookingRepo.findAllbyParkingSlotId(id);
		if(b!=null) {
		for (Booking booking : b) {
			System.out.println("sdfghjklwertyuiopiwertyuiop");
			bookingRepo.deleteBookingsByParkingSlotId(booking.getId());
			System.out.println("Sussefully deleted");
		}
		}
		
		
	}
	
	
	
}