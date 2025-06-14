package com.developia.ecommerce_ibrahim_project.repository;


import com.developia.ecommerce_ibrahim_project.entity.Product;
import com.developia.ecommerce_ibrahim_project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {



    List<Product> findByNameContainingOrDescriptionContaining(String name, String description);
    List<Product> findAllByUser(User user);
}
