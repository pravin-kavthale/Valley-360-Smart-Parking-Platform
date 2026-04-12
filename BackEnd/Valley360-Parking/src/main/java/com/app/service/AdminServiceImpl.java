package com.app.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.app.enums.RoleEnum;
import com.app.repository.UserRepository;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User login(String email, String password) {
		User adminUser = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

		if (adminUser.getRole() == null || adminUser.getRole().getRoleName() != RoleEnum.ROLE_ADMIN) {
			throw new AccessDeniedException("Unauthorized: admin access required");
		}

		if (!passwordEncoder.matches(password, adminUser.getPassword())) {
			throw new BadCredentialsException("Invalid email or password");
		}

		return adminUser;
	}

}
