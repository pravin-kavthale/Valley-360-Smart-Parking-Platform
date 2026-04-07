package com.app.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.enums.RoleEnum;
import com.app.exception.InvalidIdFoundException;
import com.app.exception.UserAlreadyExistsException;
import com.app.exception.UserNotFoundException;
import com.app.repository.RoleRepository;
import com.app.repository.UserRepository;
import com.app.security.CustomUserDetails;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private ParkingAreaService parkingareaservice;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
//	
//	@PersistenceContext
//	private EntityManager entityManager;
	
		
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID !!"));
		return new CustomUserDetails(user);
	}

	//@Transactional
	@Override
	public User registerUser(UserDTO userDTO) {
        // Check if the role exists
		System.out.println("id, "+userDTO.getRoleId());
        Role role = roleRepository.findById(userDTO.getRoleId())
            .orElseThrow(() -> new InvalidIdFoundException("Invalid role ID !!"));

        // Check if the user already exists
        if (userAlreadyExists(userDTO.getEmail())) {
            throw new UserAlreadyExistsException(userDTO.getEmail() + " already exists !");
        }

        // Map UserDTO to User entity
        User newUser = mapper.map(userDTO, User.class);
        
     // Reattach the Role entity to the current persistence context
//        role = entityManager.merge(role);
              
        // Set the role to the user
        newUser.setRole(role);
        var persistRole =  roleRepository.findById(userDTO.getRoleId()).orElseThrow();
        Set<Role> roles = new HashSet<Role>();
        roles.add(persistRole);
        newUser.setUserRoles(roles);
//        newUser.setUserRoles(roles);
        //Encode the user's password
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // Save and return the new user
        return userRepository.save(newUser);
    }

	private boolean userAlreadyExists(String email) {
		
		return userRepository.findByEmail(email).isPresent();
	}

	@Override
	public User updateUser(User user, String email) {
		
		return userRepository.findByEmail(email).map(u -> {
			u.setFirstName(user.getFirstName());
			u.setLastName(user.getLastName());
			u.setContact(user.getContact());
			u.setAddress(user.getAddress());
			return userRepository.save(u);
		}).orElseThrow(() -> new UserNotFoundException("User could not be found !"));
	}

	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("No user found with the email :"+email));
	}

	@Override
	public void deleteUser(String email) {
		
	}

	@Override
	public User login(String email, String password) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new InvalidIdFoundException("Invalid id !!"));
		if(user != null && (password.equals(user.getPassword()))) {
			return user;
			
		}
		throw new RuntimeException("Invalid email or password");
	}

	@Override
	public List<UserDTO> findByRole(RoleEnum role) {
		List<User> users = userRepository.findByRole(role);
		return users.stream()
                .map(user -> mapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
	}

	@Override
	public User getById(long id) {
		User u=userRepository.findById(id).orElseThrow(()->new InvalidIdFoundException("Id not found"));
		System.out.println("in user controller");
			return u;
		 
	}

	@Override
	public long countAllOwners() {
		long count=userRepository.countUsersByRoleName(RoleEnum.ROLE_OWNER);
		return count;
	}

	@Override
	public long countAllCustomers() {
		long count1=userRepository.countUsersByRoleName1(RoleEnum.ROLE_CUSTOMER);
		return count1;
	}

	@Override
	public List<User> GetAllOwner() {
		List<User> listuser=userRepository.GetAllOwners(RoleEnum.ROLE_OWNER);
		return listuser;
	}
	@Override
	public List<User> GetAllCustomers() {
		List<User> listuser=userRepository.GetAllCustomers(RoleEnum.ROLE_CUSTOMER);
		return listuser;
	}

	@Transactional
	@Override
	public String Delete(Long id) {
		System.out.println("in controller");
		parkingareaservice.deleteByOwnerid(id);
		System.out.println("in controller");
		User u=userRepository.findById(id).orElseThrow(()-> new InvalidIdFoundException("Invalid id"));
		
		userRepository.deleteById(id);
		return "Deleted";
	}
		
}