package com.n1talenttech.restapi.fullstackbackend.service;

import com.n1talenttech.restapi.fullstackbackend.model.User;
import com.n1talenttech.restapi.fullstackbackend.repository.UserRepository;
import com.n1talenttech.restapi.fullstackbackend.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Sign-Up Logic
    public Map<String, Object> addUser(User user) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "User with this email already exists");
            return response;
        }

        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "User created successfully");
        return response;
    }

    // Login Logic (checks hashed password and returns role)
    public Map<String, Object> loginUser(LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getUserName());
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        User user = userOpt.get();

        // Match encoded password using passwordEncoder
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid password");
            return response;
        }

        // 🔍 Debug log to verify the role
        System.out.println("✅ LOGIN: " + user.getEmail() + " logged in with ROLE = " + user.getRole());

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("role", user.getRole()); // Include role in response
        return response;
    }

    // Reset Password Logic
    public Map<String, Object> resetPassword(String email, String newPassword) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            response.put("success", false);
            response.put("message", "No account found with this email.");
            return response;
        }

        // Update the password (hashed)
        User existingUser = user.get();
        existingUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(existingUser);

        response.put("success", true);
        response.put("message", "Password has been successfully updated.");
        return response;
    }
}
