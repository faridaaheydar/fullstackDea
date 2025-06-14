package com.developia.ecommerce_ibrahim_project.repository;


import com.developia.ecommerce_ibrahim_project.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {
}
