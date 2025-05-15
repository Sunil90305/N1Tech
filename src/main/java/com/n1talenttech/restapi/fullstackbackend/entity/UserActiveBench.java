package com.n1talenttech.restapi.fullstackbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "active_bench_jobs")

public class UserActiveBench {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

private Long jobId;
    private String title;
private String company;
private String location;
private String payRate;
    @Column(name = "skills_required")
    private String skills;
private String description;
@Transient
    private String matchedTechnicalWords;
    public UserActiveBench() {}
    public UserActiveBench(String title, String company, String location, String payRate, String skillsRequired, String recruiterEmail) {
        this.title = title;
        this.company = company;
        this.location = location;
        this.payRate = payRate;
        this.skills = skills;
       this.description = description;

    }
    public Long getJobId() { return jobId; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getPayRate() { return payRate; }
    public String getSkills() { return skills; }
    public String getDescription() { return description; }
    public String getMatchedTechnicalWords() { return matchedTechnicalWords; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
    public void setTitle(String title) { this.title = title; }
    public void setCompany(String company) { this.company = company; }
    public void setLocation(String location) { this.location = location; }
    public void setPayRate(String payRate) { this.payRate = payRate; }
    public void setSkills(String skills) { this.skills = skills; }
    public void setDescription(String description) { this.description = description; }

    public void setMatchedTechnicalWords(String matchedTechnicalWords) { this.matchedTechnicalWords = matchedTechnicalWords; }

}
