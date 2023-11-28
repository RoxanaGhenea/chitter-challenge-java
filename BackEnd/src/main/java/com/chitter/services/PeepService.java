package com.chitter.services;

import com.chitter.models.Peep;
import com.chitter.models.UserDetails;
import com.chitter.repositories.PeepRepository;
import com.chitter.repositories.UserDetailsRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PeepService {
    private final PeepRepository peepRepository;
    private final UserDetailsRepository userDetailsRepository;

    public PeepService(PeepRepository peepRepository, UserDetailsRepository userDetailsRepository) {
        this.peepRepository = peepRepository;
        this.userDetailsRepository = userDetailsRepository;
    }

    public Peep addPeep(Peep newPeepData, Long userId) {
        try {
            // Retrieve UserDetails of the logged-in user
            Optional<UserDetails> optionalUser = userDetailsRepository.findById(userId);

            if (optionalUser.isPresent()) {
                UserDetails currentUser = optionalUser.get();

                Peep newPeep = new Peep();
                newPeep.setContent(newPeepData.getContent());
                newPeep.setDate(LocalDateTime.now()); 
                newPeep.setUser(currentUser); 

                return peepRepository.save(newPeep);
            } else {
                throw new IllegalArgumentException("User not found");
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public Peep editPeep(Peep editedPeepData) {
        try {
            Optional<Peep> optionalPeep = peepRepository.findById(editedPeepData.getId());
            if (optionalPeep.isPresent()) {
                Peep currentPeep = optionalPeep.get();
                currentPeep.setContent(editedPeepData.getContent());
                currentPeep.setDate(LocalDateTime.now());
                // Set other fields you may think you want to change
                return peepRepository.save(currentPeep);
            } else {
                throw new IllegalArgumentException("Peep not found");
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public void deletePeep(Long peepDataId) {
        try {
            peepRepository.deleteById(peepDataId);
        } catch (Exception e) {
            throw e;
        }
    }
    
    public List<Peep> getAllPeeps() {
        try {
            List<Peep> peeps = peepRepository.findByDateIsNotNull(); // Retrieve peeps with non-null date
            peeps.sort((a, b) -> b.getDate().compareTo(a.getDate())); // Sort descending by date
            return peeps;
        } catch (Exception e) {
            throw e;
        }
    }
    
}

