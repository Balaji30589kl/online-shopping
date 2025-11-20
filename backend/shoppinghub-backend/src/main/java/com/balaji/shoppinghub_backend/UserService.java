package com.balaji.shoppinghub_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    
    // Register a new user
    // public String registerUser(String username, String email, String password) {
        
    //     // Check if username already exists
    //     if (userRepository.existsByUsername(username)) {
    //         return "Username already exists!";
    //     }
        
    //     // Check if email already exists
    //     if (userRepository.existsByEmail(email)) {
    //         return "Email already exists!";
    //     }
        
    //     // Create new user
    //     User newUser = new User(username, email, password);
        
    //     // Save to database
    //     userRepository.save(newUser);
        
    //     return "User registered successfully!";
    // }
//     public String registerUser(String username, String email, String password) {
//     if (userRepository.existsByUsername(username)) {
//         return "Username already exists!";
//     }
//     if (userRepository.existsByEmail(email)) {
//         return "Email already exists!";
//     }

//     // Hash the password before saving
//     BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//     String hashedPassword = encoder.encode(password);

//     User newUser = new User(username, email, hashedPassword);
//     userRepository.save(newUser);

//     return "User registered successfully!";
// }

    
    // Get user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
    
    // Get total user count
    public long getTotalUsers() {
        return userRepository.count();
    }
    public String registerUser(String username, String email, String password, Role role) {
        if (userRepository.existsByUsername(username)) {
            return "Username already exists!";
        }
        if (userRepository.existsByEmail(email)) {
            return "Email already exists!";
        }

        // Hash the password before saving
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(password);

        // Create user with role
        User newUser = new User(username, email, hashedPassword, role);
        userRepository.save(newUser);

        return "User registered successfully!";
    }

    public LoginResponse loginUser(String usernameOrEmail, String password) {
        // Try to find by username first, then by email
        User user = userRepository.findByUsername(usernameOrEmail)
                    .orElseGet(() -> userRepository.findByEmail(usernameOrEmail).orElse(null));
        
        if (user == null) {
            return new LoginResponse("User not found!");
        }

        // Compare input password (plain) with hashed (DB)
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(password, user.getPassword())) {
            return new LoginResponse("Invalid credentials!");
        }

        // Generate JWT token with role and return success response
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return new LoginResponse(token, user.getUsername(), user.getRole().toString(), "Login successful!", user.getId());
    }


    // public String loginUser(String usernameOrEmail, String password) {
    //     User user = userRepository.findByUsername(usernameOrEmail)
    //                 .orElseGet(() -> userRepository.findByEmail(usernameOrEmail).orElse(null));
    //     if (user == null) {
    //         return "User not found!";
    //     }
    //     BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    //     if (!encoder.matches(password, user.getPassword())) {
    //         return "Invalid credentials!";
    //     }
    //     return "Login successful!";
    // }
//     public String loginUser(String usernameOrEmail, String password) {
//     // Try to find by username first, then by email
//     User user = userRepository.findByUsername(usernameOrEmail)
//                   .orElseGet(() -> userRepository.findByEmail(usernameOrEmail).orElse(null));
    
//     if (user == null) {
//         return "User not found!";
//     }

//     // Compare input password (plain) with hashed (DB)
//     BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//     if (!encoder.matches(password, user.getPassword())) {
//         return "Invalid credentials!";
//     }

//     // Generate and return JWT token
//     return jwtUtil.generateToken(user.getUsername());
// }
//     public LoginResponse loginUser(String usernameOrEmail, String password) {
//     // Try to find by username first, then by email
//     User user = userRepository.findByUsername(usernameOrEmail)
//                   .orElseGet(() -> userRepository.findByEmail(usernameOrEmail).orElse(null));
    
//     if (user == null) {
//         return new LoginResponse("User not found!");
//     }

//     // Compare input password (plain) with hashed (DB)
//     BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//     if (!encoder.matches(password, user.getPassword())) {
//         return new LoginResponse("Invalid credentials!");
//     }

//     // Generate JWT token and return success response
//     String token = jwtUtil.generateToken(user.getUsername());
//     return new LoginResponse(token, user.getUsername(), "Login successful!");
// }


}
