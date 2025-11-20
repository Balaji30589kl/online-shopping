package com.balaji.shoppinghub_backend;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // Get all cart items for a specific user
    List<Cart> findByUserId(Long userId);
    
    // Find a specific product in user's cart
    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);
    
    // Delete all cart items for a user (when order is placed)
    void deleteByUserId(Long userId);
}
