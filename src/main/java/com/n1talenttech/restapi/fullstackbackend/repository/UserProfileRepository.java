package com.n1talenttech.restapi.fullstackbackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.n1talenttech.restapi.fullstackbackend.model.UserProfile;


public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
}

