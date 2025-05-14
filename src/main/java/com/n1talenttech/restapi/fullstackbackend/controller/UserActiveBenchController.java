package com.n1talenttech.restapi.fullstackbackend.controller;
import com.n1talenttech.restapi.fullstackbackend.entity.UserActiveBench;
import com.n1talenttech.restapi.fullstackbackend.service.UserActiveBenchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController

@RequestMapping("/api/active-bench")
@CrossOrigin(origins = "http://localhost:3000")
public class UserActiveBenchController {
    @Autowired
    private UserActiveBenchService userActiveBenchService;
    @GetMapping
    public ResponseEntity<List<UserActiveBench>> getAllJobs() {
        List<UserActiveBench> jobs = userActiveBenchService.getAllJobs();
        jobs.forEach(job -> System.out.println("Job ID: " + job.getJobId() + ", Matched Technical Words: " + job.getMatchedTechnicalWords()));
        return ResponseEntity.ok(jobs);

    }


}
