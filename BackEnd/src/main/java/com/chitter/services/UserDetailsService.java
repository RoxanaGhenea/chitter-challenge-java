package com.chitter.services;

import com.chitter.models.UserDetails;
import com.chitter.repositories.UserDetailsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsService {
    private final UserDetailsRepository userDetailsRepository;

    public UserDetailsService(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public UserDetails addUser(UserDetails newUserData) {
        try {
            return userDetailsRepository.save(newUserData);
        } catch (Exception e) {
            throw e;
        }
    }

    public UserDetails editUser(UserDetails editedUserData) {
        try {
            Optional<UserDetails> optionalUser = userDetailsRepository.findById(editedUserData.getId());
            if (optionalUser.isPresent()) {
                UserDetails currentUser = optionalUser.get();
                currentUser.setName(editedUserData.getName());
                currentUser.setEmail(editedUserData.getEmail());
                // Set other fields as needed...
                return userDetailsRepository.save(currentUser);
            } else {
                throw new IllegalArgumentException("User not found");
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public void deleteUser(Long userDataId) {
        try {
            userDetailsRepository.deleteById(userDataId);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<UserDetails> getAllUsers() {
        try {
            return userDetailsRepository.findAll();
        } catch (Exception e) {
            throw e;
        }
    }

    public List<UserDetails> getUsersByQuery(String query) {
        try {
            // Implement your custom query using UserDetailsRepository methods
            return userDetailsRepository.findByCustomQuery(query);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<UserDetails> getUsersByQuery(String email, String password) {
        try {
            return userDetailsRepository.findByEmailAndPassword(email, password);
        } catch (Exception e) {
            throw e;
        }
    }
}

