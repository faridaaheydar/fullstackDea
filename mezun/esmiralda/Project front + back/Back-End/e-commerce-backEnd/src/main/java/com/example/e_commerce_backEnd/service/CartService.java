package com.example.e_commerce_backEnd.service;

import com.example.e_commerce_backEnd.model.Product;
import com.example.e_commerce_backEnd.model.User;
import com.example.e_commerce_backEnd.repository.ProductRepository;
import com.example.e_commerce_backEnd.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin("*")
public class CartService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartService(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public boolean removeProduct(String username, long productId) {
        // Найти пользователя
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Найти продукт
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Удалить из корзины, если он там есть
        boolean removed = user.getCart().remove(product);

        if (removed) {
            userRepository.save(user); // сохранить изменения
        }

        return removed;
    }

}
