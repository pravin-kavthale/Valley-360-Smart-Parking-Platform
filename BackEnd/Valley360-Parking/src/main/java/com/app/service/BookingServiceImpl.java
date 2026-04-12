package com.app.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.BookingDTO;
import com.app.dto.QrValidationResponseDTO;
import com.app.entities.Booking;
import com.app.entities.ParkingSlot;
import com.app.entities.User;
import com.app.enums.BookingStatus;
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
	public BookingDTO bookParkingSlot(BookingDTO booking) {
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
		book.setStatus(BookingStatus.ACTIVE);
		book.setQrToken(generateUniqueQrToken());

		Booking savedBooking = bookingRepo.save(book);

		BookingDTO response = mapper.map(savedBooking, BookingDTO.class);
		response.setCustomer_id(savedBooking.getUser() != null ? savedBooking.getUser().getId() : null);
		response.setParking_slot_id(
				savedBooking.getParkingSlot() != null ? savedBooking.getParkingSlot().getId() : null);
		response.setSlotNumber(savedBooking.getParkingSlot() != null ? savedBooking.getParkingSlot().getId() : null);
		response.setParkingAreaName(
				savedBooking.getParkingSlot() != null && savedBooking.getParkingSlot().getParking() != null
						? savedBooking.getParkingSlot().getParking().getArea()
						: null);
		return response;

	}

	private String generateUniqueQrToken() {
		String token;
		do {
			token = UUID.randomUUID().toString();
		} while (bookingRepo.findByQrToken(token).isPresent());
		return token;
	}

	@Override
	public QrValidationResponseDTO validateQrToken(String qrToken) {
		if (qrToken == null || qrToken.trim().isEmpty()) {
			return new QrValidationResponseDTO("INVALID", "QR token is required.", null);
		}

		Booking booking = bookingRepo.findByQrToken(qrToken)
				.orElse(null);

		if (booking == null) {
			return new QrValidationResponseDTO("INVALID", "QR token not found.", null);
		}

		LocalDateTime now = LocalDateTime.now();

		if (booking.getDepartureDate() != null && now.isAfter(booking.getDepartureDate())) {
			if (booking.getStatus() != BookingStatus.EXPIRED) {
				booking.setStatus(BookingStatus.EXPIRED);
				bookingRepo.save(booking);
			}
			return new QrValidationResponseDTO("EXPIRED", "Booking has expired.", booking.getId());
		}

		if (booking.getStatus() == BookingStatus.USED) {
			return new QrValidationResponseDTO("INVALID", "QR already used.", booking.getId());
		}

		if (booking.getStatus() == BookingStatus.EXPIRED) {
			return new QrValidationResponseDTO("EXPIRED", "Booking has expired.", booking.getId());
		}

		if (booking.getArrivalDate() != null && now.isBefore(booking.getArrivalDate())) {
			return new QrValidationResponseDTO("INVALID", "Booking window has not started yet.", booking.getId());
		}

		booking.setStatus(BookingStatus.USED);
		bookingRepo.save(booking);
		return new QrValidationResponseDTO("SUCCESS", "QR validated successfully.", booking.getId());
	}

	@Override
	public List<Booking> viewBookingHistory(Long id) {
		bookingRepo.findById(id);
		return null;
	}

	// @Override
	// public List<BookingDTO> getTodaysBookings(Long ownerId) {
	// LocalDate today = LocalDate.now();
	// List<Booking> bookings = bookingRepo.findTodaysBookingsByOwnerId(ownerId,
	// today);
	// return bookings.stream().map(book -> mapper.map(book, BookingDTO.class))
	// .collect(Collectors.toList());
	// }
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
		// return bookings.stream().map(book -> mapper.map(book, BookingDTO.class))
		// .collect(Collectors.toList());

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

		List<Booking> b = bookingRepo.findAllbyParkingSlotId(id);
		if (b != null) {
			for (Booking booking : b) {
				System.out.println("sdfghjklwertyuiopiwertyuiop");
				bookingRepo.deleteBookingsByParkingSlotId(booking.getId());
				System.out.println("Sussefully deleted");
			}
		}

	}

}