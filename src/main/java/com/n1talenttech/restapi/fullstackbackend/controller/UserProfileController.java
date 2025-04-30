package com.n1talenttech.restapi.fullstackbackend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.n1talenttech.restapi.fullstackbackend.model.UserProfile;
import com.n1talenttech.restapi.fullstackbackend.repository.UserProfileRepository;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class UserProfileController {

    @Autowired
    private UserProfileRepository repository;


    @PostMapping("/save")
// filepath: c:\Users\prana\OneDrive\Desktop\N1 Project Git\Backend\UserProfileController.java
    public UserProfile saveProfile(@RequestBody UserProfile profile) throws IOException {

        // Handle file upload if resumeUrl is provided
        if (profile.getResumeUrl() != null && !profile.getResumeUrl().isEmpty()) {
            String uploadDir = System.getProperty("user.dir") + "/uploads";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String fileName = profile.getResumeUrl();
            String filePath = uploadDir + "/" + fileName;

            // Simulate file saving (you can implement actual file handling logic if needed)
            File file = new File(filePath);
            if (!file.exists()) {
                file.createNewFile();
            }

            profile.setResumeUrl(fileName); // Save file name or path in DB
        }

        UserProfile savedProfile = repository.save(profile);
        System.out.println("Received profile data: " + savedProfile);
        return savedProfile;
    }

    @GetMapping("/all")
    public Iterable<UserProfile> getAllProfiles() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public UserProfile getProfileById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
}

