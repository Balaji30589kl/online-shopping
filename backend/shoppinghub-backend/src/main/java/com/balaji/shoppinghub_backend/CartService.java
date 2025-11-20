package com.balaji.shoppinghub_backend;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // Add item to cart (or update quantity if already exists)
    public Cart addToCart(Long userId, Long productId, Integer quantity) {
        Optional<Cart> existingCart = cartRepository.findByUserIdAndProductId(userId, productId);
        
        if (existingCart.isPresent()) {
            // Update quantity if product already in cart
            Cart cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + quantity);
            return cartRepository.save(cart);
        } else {
            // Add new item to cart
            Cart newCart = new Cart(userId, productId, quantity);
            return cartRepository.save(newCart);
        }
    }

    // Get all cart items for a user
    public List<Cart> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    // Update quantity of a cart item
    public Optional<Cart> updateCartItem(Long cartId, Integer quantity) {
        return cartRepository.findById(cartId).map(cart -> {
            cart.setQuantity(quantity);
            return cartRepository.save(cart);
        });
    }

    // Remove item from cart
    public boolean removeFromCart(Long cartId) {
        if (cartRepository.existsById(cartId)) {
            cartRepository.deleteById(cartId);
            return true;
        }
        return false;
    }

    // Clear entire cart for a user
    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }
}
