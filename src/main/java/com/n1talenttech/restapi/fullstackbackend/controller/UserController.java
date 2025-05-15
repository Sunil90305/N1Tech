package com.n1talenttech.restapi.fullstackbackend.controller;

import com.n1talenttech.restapi.fullstackbackend.model.User;
import com.n1talenttech.restapi.fullstackbackend.request.LoginRequest;
import com.n1talenttech.restapi.fullstackbackend.service.UserService;
import com.n1talenttech.restapi.fullstackbackend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Sign Up Endpoint
    @PostMapping("/addUser")
    public ResponseEntity<Map<String, Object>> addUser(@RequestBody User user) {
        Map<String, Object> response = userService.addUser(user);

        if (Boolean.FALSE.equals(response.get("success"))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.ok(response);
    }

    // Login Endpoint
    @PostMapping("/loginUser")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = userService.loginUser(loginRequest);

        if (Boolean.FALSE.equals(response.get("success"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.ok(response);
    }

    // Reset Password Endpoint
    @PostMapping("/resetPassword")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Map<String, Object> response = userService.resetPassword(email, newPassword);

        if (Boolean.FALSE.equals(response.get("success"))) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        return ResponseEntity.ok(response);
    }

    // Get current user details from JWT token
    @GetMapping("/api/user/me")
    public ResponseEntity<Map<String, Object>> getUserDetails(HttpServletRequest request) {
        try {
            // Extract the JWT token from the Authorization header
            String authorizationHeader = request.getHeader("Authorization");
            System.out.println("Authorization Header Received: " + authorizationHeader); // Debugging log
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Authorization header is missing or invalid"));
            }

            String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid or expired token"));
            }

            // Extract email from the token
            String email = jwtUtil.extractEmail(token);
            System.out.println("Extracted Email from Token: " + email); // Debugging log

            // Fetch user details
            Map<String, Object> response = userService.getUserDetails(email);
            if (Boolean.FALSE.equals(response.get("success"))) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "An error occurred"));
        }
    }

    // Update user endpoint
    @PutMapping("/api/user/update")
    public ResponseEntity<?> updateUser(@RequestBody User user, @RequestHeader("Authorization") String token) {
        try {
            System.out.println("Incoming payload: " + user); // Debugging log
            System.out.println("Authorization header: " + token); // Debugging log

            // Call the service to update the user
            User updatedUser = userService.updateUser(user, token);

            return ResponseEntity.ok(updatedUser); // Return the updated user
        } catch (Exception e) {
            System.out.println("Error in updateUser: " + e.getMessage()); // Debugging log
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage())); // Return error message
        }
    }
}