package com.example.e_commerce_backEnd.service;

import com.example.e_commerce_backEnd.controller.ProductController;
import com.example.e_commerce_backEnd.model.Product;
import com.example.e_commerce_backEnd.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductsService {
    private final ProductRepository productRepository;

    public List<Product> getProductsByOwnerUsername(String ownerUsername) {
        return productRepository.findByOwnerUsername(ownerUsername);
    }
}
