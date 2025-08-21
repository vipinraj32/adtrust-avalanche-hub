package com.avax.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avax.bean.Advertiser;

public interface AdvertiserRepository extends JpaRepository<Advertiser,String> {

}
