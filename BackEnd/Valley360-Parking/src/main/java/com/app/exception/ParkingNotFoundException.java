package com.app.exception;

public class ParkingNotFoundException extends RuntimeException {

	public ParkingNotFoundException(String msg) {
		super(msg);
	}
}
