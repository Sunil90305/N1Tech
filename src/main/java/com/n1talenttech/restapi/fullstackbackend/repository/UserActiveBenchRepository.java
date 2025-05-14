package com.n1talenttech.restapi.fullstackbackend.repository;
import com.n1talenttech.restapi.fullstackbackend.entity.UserActiveBench;
import com.n1talenttech.restapi.fullstackbackend.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface UserActiveBenchRepository extends JpaRepository<UserActiveBench, Long> {

}
