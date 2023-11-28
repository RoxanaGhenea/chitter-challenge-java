package com.chitter.repositories;

import com.chitter.models.UserDetails;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
    // Add custom query methods if needed / adjust this as needed.
    @Query("SELECT u FROM UserDetails u WHERE u.email = :query OR u.username = :query")
    List<UserDetails> findByCustomQuery(String query);
    List<UserDetails> findByEmailAndPassword(String email, String password);    
}

