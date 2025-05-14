//package com.n1talenttech.restapi.fullstackbackend.controller;
//
//import com.n1talenttech.restapi.fullstackbackend.entity.UserJobApplication;
//
//import com.n1talenttech.restapi.fullstackbackend.service.UserJobApplicationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api/applications")
//
//public class UserJobApplicationController {
//@Autowired
//    private UserJobApplicationService userJobApplicationService;
//
//    @GetMapping("/{jobId}")
//    public ResponseEntity<List<UserJobApplication>> getApplicationsByJob(@PathVariable Long jobId) {
//        return ResponseEntity.ok(userJobApplicationService.findByJobId(jobId));
//    }
//
//    @PostMapping(consumes = {"multipart/form-data"})
//    public ResponseEntity<String> submitApplication(
//            @RequestParam("jobId") Long jobId,
//            @RequestParam("applicantFirstName") String firstName,
//            @RequestParam("applicantLastName") String lastName,
//            @RequestParam("applicantEmail") String email,
//            @RequestParam("resumeFile") MultipartFile resumeFile,
//            @RequestParam("coverLetterFile") MultipartFile coverLetterFile
//    ) {
//        try {
//            // Simulating file storage (you can replace this with actual file storage logic)
//            String resumeFileName = resumeFile.getOriginalFilename();
//            String coverLetterFileName = coverLetterFile.getOriginalFilename();
//
//            // Create a new UserJobApplication object
//            UserJobApplication application = new UserJobApplication();
//            application.setJobId(jobId);
//            application.setApplicantName(firstName + " " + lastName);
//            application.setApplicantEmail(email);
//            application.setResumeUrl(resumeFileName); // Replace with actual file storage URL
//            application.setCoverLetterUrl(coverLetterFileName); // Replace with actual file storage URL
//
//            // Save the application to the database
//            userJobApplicationService.submitApplication(application);
//
//            return ResponseEntity.ok("Application submitted successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
//        }
//    }
//}
//
