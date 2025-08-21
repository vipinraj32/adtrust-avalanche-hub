package com.avax.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.avax.bean.Advertiser;
import com.avax.service.AdvertiserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/advertiser")
public class AdvertiserController {
	
	@Autowired
	private AdvertiserService service;
	@PostMapping("/register")
	public ResponseEntity<Advertiser> addEntity(@RequestBody @Valid Advertiser advertiser){
		return ResponseEntity.ok(service.addAdvertiser(advertiser));
	}
	
	@PostMapping("/login")
	public ResponseEntity<Advertiser> addEntity(@RequestParam("email")String email, @RequestParam("password")String password){
		return ResponseEntity.ok(service.login(email, password));
	}

}
