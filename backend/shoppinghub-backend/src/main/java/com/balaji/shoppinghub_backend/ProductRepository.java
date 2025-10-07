package com.balaji.shoppinghub_backend;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // List products by a specific seller
    List<Product> findBySellerId(Long sellerId);

    // List products by category
    List<Product> findByCategory(String category);

    // Optional: List products within a price range
    List<Product> findByPriceBetween(BigDecimal min, BigDecimal max);
}
