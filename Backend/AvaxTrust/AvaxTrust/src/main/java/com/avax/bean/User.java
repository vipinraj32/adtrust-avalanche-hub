package com.avax.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
	
	@Id
	@NotNull
	private String username;
	@NotBlank(message = "Name is required")
	private String name;
	@NotNull
	private String walletAddress;
	  @NotBlank(message = "Email is required")
	  @Email(message = "Please enter a valid email address")
	private String email;
	  @NotBlank(message = "Password is required")
	  @Size(min = 8,max = 200, message = "Password must be at least 8 characters long. ")
	private String password;
	

	
}
