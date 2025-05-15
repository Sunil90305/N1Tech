package com.n1talenttech.restapi.fullstackbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String skills;
    private String experience;

    private String location;
    private String role;

    @Column(name = "visa_status")
    private String visaStatus;

    @Column(name = "expected_pay_rate")
    private String expectedPayRate;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "resume_url")
    private String resumeUrl;

    public UserProfile(Long id, String name, String email, String phone, String skills, String experience,
                       String location, String role, String visaStatus, String expectedPayRate,
                       String comments, String resumeUrl) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.skills = skills;
        this.experience = experience;
        this.location = location;
        this.role = role;
        this.visaStatus = visaStatus;
        this.expectedPayRate = expectedPayRate;
        this.comments = comments;
        this.resumeUrl = resumeUrl;
    }

    public UserProfile() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getVisaStatus() {
        return visaStatus;
    }

    public void setVisaStatus(String visaStatus) {
        this.visaStatus = visaStatus;
    }

    public String getExpectedPayRate() {
        return expectedPayRate;
    }

    public void setExpectedPayRate(String expectedPayRate) {
        this.expectedPayRate = expectedPayRate;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }
}