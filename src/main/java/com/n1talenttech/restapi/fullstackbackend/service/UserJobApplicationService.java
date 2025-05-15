//package com.n1talenttech.restapi.fullstackbackend.service;
//import com.n1talenttech.restapi.fullstackbackend.entity.UserJobApplication;
//import com.n1talenttech.restapi.fullstackbackend.repository.UserJobApplicationRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;
//@Service
//public class UserJobApplicationService {
//@Autowired
//    private UserJobApplicationRepository userJobApplicationRepository;
//   public List<UserJobApplication> findByJobId(Long jobId) {
//       return userJobApplicationRepository.findByJobId(jobId);
//   }
//
//    public UserJobApplication submitApplication(UserJobApplication application){
//        System.out.println("Saving application: " + application);
//        UserJobApplication savedApplication = userJobApplicationRepository.save(application);
//        System.out.println("Saved successfully: " + savedApplication);
//        return savedApplication;
//    }
//    // Find all applications (optional, if needed)
//    public List<UserJobApplication> findAllApplications() {
//        return userJobApplicationRepository.findAll();
//    }
//
//    // Delete an application by ID (optional, if needed)
//    public void deleteApplicationById(Long applicationId) {
//        if (userJobApplicationRepository.existsById(applicationId)) {
//            userJobApplicationRepository.deleteById(applicationId);
//            System.out.println("Deleted application with ID: " + applicationId);
//        } else {
//            System.out.println("Application with ID " + applicationId + " does not exist.");
//        }
//    }
//
//}
