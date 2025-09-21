package com.balaji.shoppinghub_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    // User registration endpoint
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.registerUser(user.getUsername(), user.getEmail(), user.getPassword(), user.getRole());
    }
    
    // Get user by username
    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
    
    // Get total user count
    @GetMapping("/count")
    public String getUserCount() {
        long count = userService.getTotalUsers();
        return "Total users: " + count;
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest.getUsernameOrEmail(), loginRequest.getPassword());
    }
    @GetMapping("/profile")
    public String getUserProfile(@RequestHeader("Authorization") String token) {
        try {
            // Remove "Bearer " prefix from token
            String jwtToken = token.substring(7);

            // Extract username from token
            String username = jwtUtil.extractUsername(jwtToken);

            // Validate token
            if (jwtUtil.validateToken(jwtToken, username)) {
                return "Welcome to your profile, " + username + "!";
            } else {
                return "Invalid or expired token!";
            }
        } catch (Exception e) {
            return "Authorization header missing or invalid!";
        }
    }



}
