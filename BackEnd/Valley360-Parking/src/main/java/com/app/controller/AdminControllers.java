//package com.app.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.entities.User;
//import com.app.enums.RoleEnum;
//import com.app.service.AdminService;
//
//@RestController
//@RequestMapping("/Admin")
//@CrossOrigin(origins = "*") 
//public class AdminControllers {
//
//	@Autowired
//	private AdminService admin;
//	
//	@PostMapping("/Login")
//	public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
//        String email1 = admin.login(email, password);
//        
//        return ResponseEntity.ok(email1);
//    }
//	
//	
//	
//	
//	
//}
