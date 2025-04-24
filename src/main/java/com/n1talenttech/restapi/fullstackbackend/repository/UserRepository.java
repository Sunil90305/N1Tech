package com.n1talenttech.restapi.fullstackbackend.repository;

import com.n1talenttech.restapi.fullstackbackend.model.User;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email); // Custom method to find a user by email
}
