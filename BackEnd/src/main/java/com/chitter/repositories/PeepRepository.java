package com.chitter.repositories;

import com.chitter.models.Peep;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeepRepository extends JpaRepository<Peep, Long> {
    List<Peep> findByContentContaining(String content);
    List<Peep> findByDateIsNotNull();
}

