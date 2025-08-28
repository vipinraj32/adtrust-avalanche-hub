package com.avax.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avax.bean.Proof;
import com.avax.service.ProofService;

@RestController
@RequestMapping("/api/proofs")
public class ProofController {

    @Autowired
    private  ProofService proofService;

    @GetMapping("/add")
    public ResponseEntity<Proof> addProof(@RequestBody Proof proof){
        Proof createdProof = proofService.addProof(proof);
        return ResponseEntity.status(HttpStatus.OK).body(createdProof);
    }
    
}
