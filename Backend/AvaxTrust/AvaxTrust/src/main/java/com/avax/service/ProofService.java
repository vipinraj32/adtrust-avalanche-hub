package com.avax.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avax.bean.Proof;
import com.avax.exception.ResourseNotCreateException;
import com.avax.repository.ProofRepository;

@Service
public class ProofService {

    @Autowired
    private ProofRepository repository;
    
    public Proof addProof(Proof proof) {
        Proof proof2=repository.findById(proof.getVideoUrl()).orElse(null);
        if(proof2!=null){
            throw new ResourseNotCreateException("VideoURL already exists");
        }
        return repository.save(proof);
    }
}
