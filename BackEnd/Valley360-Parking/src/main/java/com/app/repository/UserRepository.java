package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.User;
import com.app.enums.RoleEnum;

public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("select u from User u join fetch u.userRoles where u.email=?1")
	Optional<User> findByEmail(String email);

	List<User> findByRole(RoleEnum role);

	@Query("SELECT COUNT(u) FROM User u WHERE u.role.roleName = :roleName")
    long countUsersByRoleName( RoleEnum roleName);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.role.roleName = :roleName")
    long countUsersByRoleName1( RoleEnum roleName);
	
	@Query("SELECT u FROM User u WHERE u.role.roleName = :roleName")
	List<User> GetAllOwners(RoleEnum roleName);
	
	@Query("SELECT u FROM User u where u.role.roleName = :roleName")
	List<User> GetAllCustomers(RoleEnum roleName);
	
}
