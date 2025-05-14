package com.n1talenttech.restapi.fullstackbackend.controller;

import com.n1talenttech.restapi.fullstackbackend.model.User;
import com.n1talenttech.restapi.fullstackbackend.request.LoginRequest;
import com.n1talenttech.restapi.fullstackbackend.service.UserService;
import com.n1talenttech.restapi.fullstackbackend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // Sign-Up Endpoint
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
        Map<String, Object> response = new HashMap<>();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUserName(), loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails.getUsername());

            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("role", userDetails.getAuthorities().toString());

            return ResponseEntity.ok(response);

        } catch (AuthenticationException ex) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Reset Password
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

    // 🔐 Master-Only Endpoint
    @GetMapping("/master/dashboard")
    @PreAuthorize("hasRole('Master')")
    public ResponseEntity<String> masterDashboard() {
        return ResponseEntity.ok("Welcome Master - secured dashboard");
    }

    // 🔐 Consultant-Only Endpoint
    @GetMapping("/consultant/dashboard")
    @PreAuthorize("hasRole('Consultant')")
    public ResponseEntity<String> consultantDashboard() {
        return ResponseEntity.ok("Welcome Consultant - secured dashboard");
    }

    // 🔍 Return user info from token (used by Navbar)
    @GetMapping("/api/user/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Missing or invalid token"));
        }

        token = token.substring(7); // remove "Bearer "

        try {
            String email = jwtUtil.extractEmail(token);
            Map<String, Object> userDetails = userService.getUserDetails(email);
            return ResponseEntity.ok(userDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid or expired token"));
        }
    }

    // Debug endpoint (optional)
    @GetMapping("/user/role")
    public ResponseEntity<String> getUserRole(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok("Logged-in user: " + userDetails.getUsername());
    }
}
