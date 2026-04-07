package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserDTO;
import com.app.enums.RoleEnum;
import com.app.service.AdminService;
import com.app.service.ParkingAreaService;
import com.app.service.ParkingSlotService;
import com.app.service.UserService;

@RestController
@RequestMapping("/Admin")
@CrossOrigin(origins = "*")
public class AdminController {

	@Autowired
	UserService userService;
	
	@Autowired
	private AdminService admin;
	
	@Autowired
	private ParkingSlotService parkingSlotService;
	
	@Autowired
	private ParkingAreaService parkingAreaService;
	
	
	@GetMapping("/findByRole")
	public ResponseEntity<List<UserDTO>> findByRole(@RequestParam String role){
		List<UserDTO> users = userService.findByRole(RoleEnum.valueOf(role));
		return ResponseEntity.status(HttpStatus.OK).body(users);
	}
	
	@GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> getDashboardData() {
    	
        Map<String, Long> data = new HashMap<String,Long>();
        data.put("parkingSlots", parkingSlotService.countAllSlots());
        data.put("parkingAreas", parkingAreaService.countAllAreas());
        data.put("owners", userService.countAllOwners());
        data.put("customers", userService.countAllCustomers());
        return ResponseEntity.ok(data);
    }
	
	@PostMapping("/Login")
	public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        String email1 = admin.login(email, password);
        
        return ResponseEntity.ok(email1);
    }
}
