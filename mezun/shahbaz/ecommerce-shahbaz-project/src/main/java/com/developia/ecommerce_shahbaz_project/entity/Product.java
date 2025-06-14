package com.developia.ecommerce_shahbaz_project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @Column(name = "image_url", length = 3000)
    private String imageUrl;
    private BigDecimal price;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @Column(name = "created_at")
    private final LocalDateTime createdAt = LocalDateTime.now();
}
