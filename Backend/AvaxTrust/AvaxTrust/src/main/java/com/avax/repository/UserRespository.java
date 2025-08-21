package com.avax.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avax.bean.User;

public interface UserRespository extends JpaRepository<User, String> {

}
