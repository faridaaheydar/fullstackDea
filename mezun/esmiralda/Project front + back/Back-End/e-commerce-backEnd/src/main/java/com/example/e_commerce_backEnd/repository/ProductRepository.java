package com.example.e_commerce_backEnd.repository;

import com.example.e_commerce_backEnd.model.Product;
import com.example.e_commerce_backEnd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    User findByName(String product);
    List<Product> id(Long id);
    List<Product> findByOwner_Username(String username);

    List<Product> findByOwnerUsername(String ownerUsername);
}
