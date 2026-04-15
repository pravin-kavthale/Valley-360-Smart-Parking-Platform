package com.app.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.security.JWTRequestFilter;

@EnableWebSecurity // mandatory
@Configuration // mandatory
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Autowired
	private JWTRequestFilter filter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint((request, response, ex) -> {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
		}).and().authorizeRequests()
				.antMatchers("/User/Register", "/User/Login", "/Admin/Login", "/admin/login", "/api/auth/**",
						"/swagger*/**", "/v*/api-docs/**")
				.permitAll()
				.antMatchers("/Admin/**", "/admin/**").hasRole("ADMIN")
				.antMatchers("/owner/**").hasRole("OWNER")
				.antMatchers("/User/**").hasAnyRole("OWNER", "CUSTOMER", "ADMIN")
				// .antMatchers("/booking/today/**").hasAnyRole("OWNER", "CUSTOMER", "ADMIN")
				.antMatchers("/booking/**").hasAnyRole("OWNER", "CUSTOMER", "ADMIN")
				.antMatchers("/parkingSlots/**").hasAnyRole("ADMIN", "CUSTOMER", "OWNER")
				.antMatchers("/parkingArea/**").hasAnyRole("ADMIN", "CUSTOMER", "OWNER")
				.antMatchers(HttpMethod.OPTIONS).permitAll().anyRequest().authenticated().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	// configure auth mgr bean : to be used in Authentication REST controller
	@Bean
	public AuthenticationManager authenticatonMgr(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}