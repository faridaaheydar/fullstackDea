package com.example.e_commerce_backEnd.controller;

import com.example.e_commerce_backEnd.dto.AddToCartRequest;
import com.example.e_commerce_backEnd.model.Product;
import com.example.e_commerce_backEnd.model.User;
import com.example.e_commerce_backEnd.repository.ProductRepository;
import com.example.e_commerce_backEnd.repository.UserRepository;
import com.example.e_commerce_backEnd.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody AddToCartRequest request) {
        // Получаем пользователя по username
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Получаем продукт по ID
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Добавляем продукт в корзину, если его там ещё нет
        if (!user.getCart().contains(product)) {
            user.getCart().add(product);
            userRepository.save(user);
        }

        return ResponseEntity.ok("Product added to cart");
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Product>> getCart(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user.getCart());
    }

    @DeleteMapping("/{username}/{productId}")
    public ResponseEntity<String> removeFromCart(@PathVariable String username, @PathVariable long productId) {
        boolean removed = cartService.removeProduct(username, productId); // предположим, что есть такой сервис

        if (removed) {
            return ResponseEntity.ok("Product removed from cart");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found in cart");
        }
    }

}

