package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.app.enums.Status;
import com.app.enums.VehicleType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "parking_slots")
@ToString
//@Getter
//@Setter
public class ParkingSlot extends BaseEntity {
	
	public ParkingSlot() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Enumerated(EnumType.STRING)
	private VehicleType vehicleType;
	@Enumerated(EnumType.STRING)
	private Status status;
	private double price;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
	@JoinColumn(name = "parking_id")	
	private ParkingArea parking;

	public ParkingSlot(VehicleType vehicleType, Status status) {
		super();
		this.vehicleType = vehicleType;
		this.status = status;
	}

	public VehicleType getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(VehicleType vehicleType) {
		this.vehicleType = vehicleType;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public ParkingArea getParking() {
		return parking;
	}

	public void setParking(ParkingArea parking) {
		this.parking = parking;
	}
	
	

	
	
	
}
