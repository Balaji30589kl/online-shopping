package com.balaji.shoppinghub_backend;

public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private Long userId;
    private String message;

    // Constructors
    public LoginResponse() {}
    
    public LoginResponse(String token, String username, String role, String message, Long userId) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.message = message;
        this.userId = userId;
    }

    // For error responses
    public LoginResponse(String message) {
        this.message = message;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
