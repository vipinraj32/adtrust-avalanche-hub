package com.avax.bean;

import java.util.Date;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proof {
    @Id
    private String videoUrl;
    private Date dateUpload;
    private String additional;
}