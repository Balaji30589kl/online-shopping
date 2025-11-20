package com.balaji.shoppinghub_backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Get all orders for a specific user
    List<Order> findByUserId(Long userId);
    
    // Get orders by status
    List<Order> findByStatus(String status);
}
