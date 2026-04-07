package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookingDTO;
import com.app.service.BookingService;


@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	@PostMapping("/add")
	public ResponseEntity<?> bookParkingSlot(@RequestBody BookingDTO dto){
		bookingService.bookParkingSlot(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body("Parking slot booked successfully!!");
	}
	
	@GetMapping("/today/{ownerId}")
    public ResponseEntity<?> getTodaysBookings(@PathVariable Long ownerId) {
		System.out.println("in bokking");
        List<BookingDTO> bookings = bookingService.getTodaysBookings(ownerId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/previous/{ownerId}")
    public ResponseEntity<?> getPreviousBookings(@PathVariable Long ownerId) {
        List<BookingDTO> bookings = bookingService.getPreviousBookings(ownerId);
        return ResponseEntity.ok(bookings);
    }
	
}
