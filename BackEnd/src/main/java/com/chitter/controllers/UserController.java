package com.chitter.controllers;

import com.chitter.models.UserDetails;
import com.chitter.services.UserDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserDetailsService userDetailsService;

    public UserController(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/add")
    public ResponseEntity<UserDetails> addUserController(@RequestBody UserDetails newUserData) {
        try {
            UserDetails newUser = userDetailsService.addUser(newUserData);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<UserDetails> editUserController(@RequestBody UserDetails editedUserData) {
        try {
            UserDetails editedUser = userDetailsService.editUser(editedUserData);
            return new ResponseEntity<>(editedUser, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserController(@PathVariable Long id) {
        try {
            userDetailsService.deleteUser(id);
            return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error deleting user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserDetails>> getAllUsersController() {
        try {
            List<UserDetails> result = userDetailsService.getAllUsers();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserDetails> loginController(@RequestBody UserDetails loginData) {
        try {
            List<UserDetails> result = userDetailsService.getUsersByQuery(loginData.getEmail(), loginData.getPassword());
            if (!result.isEmpty()) {
                return new ResponseEntity<>(result.get(0), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

