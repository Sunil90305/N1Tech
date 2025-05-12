package com.n1talenttech.restapi.fullstackbackend.service;
import com.n1talenttech.restapi.fullstackbackend.entity.UserActiveBench;
import com.n1talenttech.restapi.fullstackbackend.repository.UserActiveBenchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Map;

@Service
public class UserActiveBenchService {
    @Autowired
    private UserActiveBenchRepository userActiveBenchRepository;

    private static final Set<String> TECHNICAL_WORDS = Set.of(
            "Java", "Spring Boot", "React", "Microservices", "AWS", "Docker", "SQL", "Kafka", "API", "GraphQL"
    );
    public String classifyMatch(String jobDescription) {
        if (jobDescription == null || jobDescription.isEmpty()) {
            System.out.println("No Match - Empty Description");
            return "No Match"; // ✅ Handle empty descriptions
        }

         // Convert description to lowercase & split into words
        Set<String> descriptionWords = Set.of(jobDescription.toLowerCase().split("[,\\s]+"));


         // Find matched words from TECHNICAL_WORDS set
        Set<String> matchedWords = TECHNICAL_WORDS.stream()
                .map(String::toLowerCase)
                .filter(descriptionWords::contains) // ✅ Match words instead of characters
                .collect(Collectors.toSet());


        // Debugging logs to check word matching

        System.out.println("Job Description: " + jobDescription);
        System.out.println("Extracted Words: " + descriptionWords);
        System.out.println("Matched Words: " + matchedWords);

        // ✅ Calculate Match Percentage based on WORD COUNT
        int matchCount = matchedWords.size(); // ✅ Total matched words
        int totalWords = descriptionWords.size(); // ✅ Total words in description
        double matchPercentage = ((double) matchCount / totalWords) * 100;

        // ✅ Assign Match Classification
        if (matchPercentage > 70) {
            return "Strong Match";
        } else if (matchPercentage >= 40) {
            return "Partial Match";
        } else {
            return "No Match";
        }
    }
    public List<UserActiveBench> getAllJobs() {
        List<UserActiveBench> jobs = userActiveBenchRepository.findAll();
        for (UserActiveBench job : jobs) {
            // Handle null values for description
            String description = job.getDescription() != null ? job.getDescription() : "";
            job.setDescription(description);

            // Extract matched technical words

           String matchClassification = classifyMatch(description); // ✅ Get match classification

            job.setMatchedTechnicalWords(matchClassification); // ✅ Store match classification instead of words
            // Debugging logs

            System.out.println("Job ID: " + job.getJobId());
            System.out.println("Description: " + description);
            System.out.println("Match Classification: " + matchClassification);

            // Handle other null fields with default values
            job.setTitle(job.getTitle() != null ? job.getTitle() : "N/A");
            job.setCompany(job.getCompany() != null ? job.getCompany() : "N/A");
            job.setLocation(job.getLocation() != null ? job.getLocation() : "N/A");
            job.setPayRate(job.getPayRate() != null ? job.getPayRate() : "N/A");
            job.setSkills(job.getSkills() != null ? job.getSkills() : "N/A");
        }
        return jobs;
    }
}

