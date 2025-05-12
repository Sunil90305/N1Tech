package com.n1talenttech.restapi.fullstackbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    private String name;

    @Id
    private String email;

    private String password;

    private String role; // Newly added field for role-based access control

    // Constructor including role
    public User(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User() {
    }

    // Existing getters and setters
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

    // New getter and setter for role
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
