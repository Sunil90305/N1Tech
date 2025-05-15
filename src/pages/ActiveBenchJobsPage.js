import React, { useEffect, useState } from 'react';
import './ActiveBenchJobsPage.css';
export default function ActiveBenchJobsPage() {
    const [jobListings, setJobListings] = useState([]);
    const [error, setError] = useState('');
    // Fetch job listings from the backend
    useEffect(() => {
        fetch("http://localhost:8080/api/active-bench")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched data:", data); // Debugging log
                setJobListings(data); // Directly set the fetched data
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
                setError("Failed to load job listings. Please try again later.");
            });
    }, []);
   //  Assign CSS classes based on match level
    const getMatchClass = (matchLevel) => {
      if (matchLevel === "Strong Match") return "match-strong";
      if (matchLevel === "Partial Match") return "match-partial";
      return "match-none"; // Default to No Match
  };
    return (
        <div className="apply-job-container">
            <h1 className="page-title">Available Job Listings</h1>
            {error && <p className="error-message">{error}</p>} {/* ✅ Error message added */}
            {jobListings.length > 0 ? (
                <div className="job-listings-container">
              <div className="job-header">
                        <div className="column">Title</div>
                        <div className="column">Location</div>
                        <div className="column">Skills</div>
                        <div className="column">Pay Rate</div>
                        <div className="column">Match Level</div>
                        <div className="column">Action</div>
                    </div>
                 
                   {/* ✅ Job Listings */}
                   {jobListings.map((job) => (
                        <div key={job.jobId} className="job-row">
                            <div className="column">{job.title || "N/A"}</div>
                            <div className="column">{job.location || "N/A"}</div>
                            <div className="column">{job.skills || "N/A"}</div>
                            <div className="column">{job.payRate || "N/A"}</div>
                            <div className="column match-level">
                                <span className={`match-level ${getMatchClass(job.matchedTechnicalWords || "No Match")}`}>
                                    {job.matchedTechnicalWords || "No Match"}
                                </span>
                            </div>
                            <div className="column">
                            <button className="apply-button">Apply</button>  
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading job listings...</p>
            )}
            </div>
    );
}