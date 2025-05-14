package com.n1talenttech.restapi.fullstackbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    private String name;

    @Id
    private String email;

    private String password;

    private String role; // Role-based access

    @Column(name = "phoneNumber")
    private String phoneNumber; // ✅ New field for phone number

    // Default constructor
    public User() {
    }

    // Constructor with all fields
    public User(String name, String email, String password, String role, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
