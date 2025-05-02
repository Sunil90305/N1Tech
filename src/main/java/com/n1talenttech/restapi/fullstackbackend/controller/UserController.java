package com.n1talenttech.restapi.fullstackbackend.controller;

import com.n1talenttech.restapi.fullstackbackend.model.User;
import com.n1talenttech.restapi.fullstackbackend.request.LoginRequest;
import com.n1talenttech.restapi.fullstackbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import utility.JwtUtil;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    // Sign-Up Endpoint
    @PostMapping("/addUser")
    public ResponseEntity<Map<String, Object>> addUser(@RequestBody User user) {
        Map<String, Object> response = userService.addUser(user);

        if (Boolean.FALSE.equals(response.get("success"))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
        }

        return ResponseEntity.ok(response); // 200 OK
    }

    // Login Endpoint
    @PostMapping("/loginUser")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = userService.loginUser(loginRequest);

        if (Boolean.FALSE.equals(response.get("success"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // 401 Unauthorized
        }
        return ResponseEntity.ok(response);
    }
        // Generate JWT Token upon successful login
//        String token = JwtUtil.generateToken(loginRequest.getUserName());
//        response.put("token", token); // Attach token to response
//        return ResponseEntity.ok(response); // 200 OK



    //resetpassword endpoint
    @PostMapping("/resetPassword")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Map<String, Object> response = userService.resetPassword(email, newPassword);

        if (Boolean.FALSE.equals(response.get("success"))) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 404 Not Found
        }

        return ResponseEntity.ok(response); // 200 OK
    }

    // Get User Details by Email
    @GetMapping("/User/{email}")
    public ResponseEntity<Map<String, Object>> getUserByEmail(@PathVariable String email) {
        Map<String, Object> response = userService.getUserByEmail(email);

        if (Boolean.FALSE.equals(response.get("success"))) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 404 Not Found
        }

        return ResponseEntity.ok(response); // 200 OK
    }



}
