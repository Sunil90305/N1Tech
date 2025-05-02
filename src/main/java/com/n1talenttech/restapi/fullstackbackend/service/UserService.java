package com.n1talenttech.restapi.fullstackbackend.service;

import com.n1talenttech.restapi.fullstackbackend.model.User;
import com.n1talenttech.restapi.fullstackbackend.repository.UserRepository;
import com.n1talenttech.restapi.fullstackbackend.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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

        response.put("success", true);
        response.put("message", "Login successful");
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


    // Get User by Email
    public Map<String, Object> getUserByEmail(String email) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> user = userRepository.findByEmail(email);

        if (user == null) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        response.put("success", true);
        response.put("user", user);
        return response;
    }
}
