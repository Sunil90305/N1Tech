package com.n1talenttech.restapi.fullstackbackend.service;

import com.n1talenttech.restapi.fullstackbackend.model.User;
import com.n1talenttech.restapi.fullstackbackend.repository.UserRepository;
import com.n1talenttech.restapi.fullstackbackend.request.LoginRequest;
import com.n1talenttech.restapi.fullstackbackend.util.JwtUtil;
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

    @Autowired
    private JwtUtil jwtUtil;

    // Sign-Up Logic
    public Map<String, Object> addUser(User user) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "User with this email already exists");
            return response;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "User created successfully");
        return response;
    }

    // Login Logic
    public Map<String, Object> loginUser(LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getUserName());
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid password");
            return response;
        }

        String token = jwtUtil.generateToken(user.getEmail());

        System.out.println("✅ LOGIN: " + user.getEmail() + " logged in with ROLE = " + user.getRole());

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("role", user.getRole());
        response.put("token", token);
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

        User existingUser = user.get();
        existingUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(existingUser);

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
        response.put("success", true);
        response.put("name", user1.getName());
        response.put("email", user1.getEmail());
        response.put("phoneNumber", user1.getPhoneNumber()); // Ensure User.java has this method
        return response;
    }

    public User updateUser(User user, String token) throws Exception {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        System.out.println("Token after stripping Bearer: " + token);

        if (!jwtUtil.validateToken(token)) {
            throw new Exception("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        System.out.println("Email extracted from token: " + email);

        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        existingUser.setName(user.getName());
        existingUser.setPhoneNumber(user.getPhoneNumber()); // Ensure User.java has this method

        return userRepository.save(existingUser);
    }
}
