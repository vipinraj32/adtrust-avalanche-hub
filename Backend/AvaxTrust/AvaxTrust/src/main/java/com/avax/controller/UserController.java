package com.avax.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

import com.avax.bean.User;
import com.avax.service.EmailService;
import com.avax.service.UserService;

import jakarta.validation.Valid;
@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService service;
    @Autowired
	private EmailService emailService;
	
	@PostMapping	("/signup")
    public ResponseEntity<User> getUserInfo(@RequestBody @Valid User user) {
          User user2= service.addUser(user);
          String subject="Successful Login to Your Account";
	        LocalDateTime dateTime = LocalDateTime.now();
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

	        String formattedDateTime = dateTime.format(formatter);
//	        ZonedDateTime dateTime = ZonedDateTime.now();
	        String text="Hi "+user2.getUsername()+",\r\n"
	        		+ "\r\n"
	        		+ "We wanted to let you know that your account was successfully logged in on "+formattedDateTime+" .\r\n"
	        		+ "\r\n"
	        		+ "If this was you, there's nothing to worry about! However, if you did not authorize this login, please secure your account immediately by resetting your password or contacting our support team.\r\n"
	        		+ "\r\n"
	        		+ "Thank you for being with us!\r\n"
	        		+ "\r\n"
	        		+ "Best regards,\r\n"
	        		+ "Thinkedge";
	        emailService.sendEmail(user2.getUsername(),subject ,text);
        return ResponseEntity.status(HttpStatus.OK).body(user2);
    }
	
	@PostMapping("/login")
    public ResponseEntity<User> getUserInfo(@RequestParam("username")String username, @RequestParam("password")String password) {
        return ResponseEntity.status(HttpStatus.OK).body(service.login(username, password));
    }
    
}


