package com.example.e_commerce_backEnd.controller;

import com.example.e_commerce_backEnd.dto.ProductRequest;
import com.example.e_commerce_backEnd.model.Product;
import com.example.e_commerce_backEnd.model.User;
import com.example.e_commerce_backEnd.repository.ProductRepository;
import com.example.e_commerce_backEnd.repository.UserRepository;
import com.example.e_commerce_backEnd.service.ProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductsService productService;
    private final UserRepository userRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Product>> getProductsByUsername(@PathVariable String username) {
        try {
            List<Product> userProducts = productService.getProductsByOwnerUsername(username);
            return ResponseEntity.ok(userProducts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/updateProduct/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Optional<Product> existingProductOpt = productRepository.findById(id);

        if (existingProductOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }

        Product existingProduct = existingProductOpt.get();

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setImage(updatedProduct.getImage());
        existingProduct.setRating(updatedProduct.getRating());

        productRepository.save(existingProduct);

        return ResponseEntity.ok("Product updated successfully");
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            // Удаляем из корзин всех пользователей (если нужно)
            for (User user : product.getUsersWithThisInCart()) {
                user.getCart().remove(product);
            }

            product.setUsersWithThisInCart(null); // Очистка ManyToMany связи
            product.setOwner(null); // Разрываем связь с владельцем

            productRepository.delete(product); // <-- не deleteById, а delete(entity)
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {
        Optional<User> ownerOpt = userRepository.findByUsername(request.getOwnerUsername());
        if (ownerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Product product = new Product();
        product.setName(request.getModel());
        product.setCategory(request.getCategory());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setRating(request.getRating() != null ? request.getRating().intValue() : 0);
        product.setImage(request.getImage());
        product.setOwner(ownerOpt.get());

        Product savedProduct = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }


}
