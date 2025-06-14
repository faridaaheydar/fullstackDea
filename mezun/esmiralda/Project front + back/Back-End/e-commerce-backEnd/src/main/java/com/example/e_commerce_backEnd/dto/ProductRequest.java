package com.example.e_commerce_backEnd.dto;

import lombok.Data;

@Data
public class ProductRequest {
    private String model;
    private String category;
    private String description;
    private Double price;
    private Double rating;
    private String image;
    private String ownerUsername; // <-- имя пользователя, чтобы найти владельца


}
