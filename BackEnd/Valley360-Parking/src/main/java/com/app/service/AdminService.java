package com.app.service;

import com.app.entities.User;

public interface AdminService {

	User login(String email, String password);
}
