package com.example.e_commerce_backEnd.dto;

import lombok.Data;

@Data
public class AddToCartRequest {
    private String username;
    private Long productId;
}

