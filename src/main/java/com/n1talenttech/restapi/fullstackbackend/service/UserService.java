package com.n1talenttech.restapi.fullstackbackend.service;

import com.n1talenttech.restapi.fullstackbackend.model.User;
import com.n1talenttech.restapi.fullstackbackend.repository.UserRepository;
import com.n1talenttech.restapi.fullstackbackend.request.LoginRequest;
import com.n1talenttech.restapi.fullstackbackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Sign-Up Logic
    public Map<String, Object> addUser(User user) {
        Map<String, Object> response = new HashMap<>();

        // Check if a user with the same email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "User with this email already exists");
            return response;
        }

        // Save the new user
        userRepository.save(user);
        response.put("success", true);
        response.put("message", "User created successfully");
        return response;
    }

    // Login Logic
    public Map<String, Object> loginUser(LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> user = userRepository.findById(loginRequest.getUserName());

        if (user.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        User user1 = user.get();
        if (!user1.getPassword().equals(loginRequest.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid password");
            return response;
        }

        // Generate JWT Token
        String token = jwtUtil.generateToken(user1.getEmail());

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("token", token); // Return the token
        return response;
    }

    // Resetpassword logic
    public Map<String, Object> resetPassword(String email, String newPassword) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            response.put("success", false);
            response.put("message", "No account found with this email.");
            return response;
        }

        // Update the user's password
        User existingUser = user.get();
        existingUser.setPassword(newPassword); // Update the password
        userRepository.save(existingUser); // Save the updated user

        response.put("success", true);
        response.put("message", "Password has been successfully updated.");
        return response;
    }

    public Map<String, Object> getUserDetails(String email) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        User user1 = user.get();
        System.out.println("User fetched from DB: " + user1); // ✅ Debugging log
        response.put("success", true);
        response.put("name", user1.getName());
        response.put("email", user1.getEmail());
        response.put("phoneNumber", user.get().getPhoneNumber()); // Include phoneNumber if needed
        System.out.println("Final API Response: " + response); // ✅ Debugging log
        return response;
    }

    public User updateUser(User user, String token) throws Exception {
        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        System.out.println("Token after stripping Bearer: " + token); // Debugging log

        // Validate the token
        if (!jwtUtil.validateToken(token)) {
            throw new Exception("Invalid or expired token");
        }

        // Extract email from the token
        String email = jwtUtil.extractEmail(token);
        System.out.println("Email extracted from token: " + email); // Debugging log

        // Find the user by email
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

//        // Update user details
//        existingUser.setName(user.getName());
//        existingUser.setPhoneNumber(user.getPhoneNumber()); // Update phoneNumber
        // Update user details
        if (user.getName() != null) {
            existingUser.setName(user.getName());
        }
        if (user.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(user.getPhoneNumber());
        }
        if (user.getEmail() != null && !user.getEmail().equals(existingUser.getEmail())) {
            throw new Exception("Email cannot be updated"); // Optional: Prevent email updates
        }

        // Save the updated user
        return userRepository.save(existingUser);
    }
}
