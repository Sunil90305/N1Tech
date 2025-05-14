//package com.n1talenttech.restapi.fullstackbackend.entity;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "job_applications")
//public class UserJobApplication {
//   @Id
//   @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long applicationId;
//   @Column(nullable = false)
//   private Long jobId;
//   @Column(nullable = false)
//   private String applicantName;
//   @Column(nullable = false)
//   private String applicantEmail;
//   private String resumeUrl;
//   private String coverLetterUrl;
//
//   public UserJobApplication() {}
//
//
//   public UserJobApplication(Long jobId, Long userId, String applicantName, String applicantEmail, String resumeUrl, String status) {
//      this.jobId = jobId;
//      this.applicantName = applicantName;
//      this.applicantEmail = applicantEmail;
//      this.resumeUrl = resumeUrl;
//      this.coverLetterUrl = coverLetterUrl;
//
//   }
//   public Long getApplicationId() {return applicationId;}
//   public void setApplicationId(Long applicationId) {}
//   public Long getJobId() {return jobId;}
//   public void setJobId(Long jobId) {this.jobId = jobId;}
//
//public String getApplicantName() {return applicantName;}
//public void setApplicantName(String applicantName) {this.applicantName = applicantName;}
//public String getApplicantEmail() {return applicantEmail;}
//public void setApplicantEmail(String applicantEmail) {this.applicantEmail = applicantEmail;}
//   public String getResumeUrl() {return resumeUrl;}
//   public void setResumeUrl(String resumeUrl) {this.resumeUrl = resumeUrl;}
//   public String getCoverLetterUrl() {return coverLetterUrl;}
//   public void setCoverLetterUrl(String coverLetterUrl) {this.coverLetterUrl = coverLetterUrl;}
//
//}
//
//
//
