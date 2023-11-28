package com.chitter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import com.chitter.controllers.UserController;

import com.chitter.models.UserDetails;
import com.chitter.services.UserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class)
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    public void testAddUserController() throws Exception {
        UserDetails newUser = new UserDetails();
        newUser.setId(1L);
        newUser.setEmail("test@example.com");
        newUser.setPassword("password");
        // Set other UserDetails properties...

        when(userDetailsService.addUser(any(UserDetails.class))).thenReturn(newUser);

        mockMvc.perform(post("/user/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"id\": 1, \"email\": \"test@example.com\", \"password\": \"password\" }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.password").value("password"));

        verify(userDetailsService, times(1)).addUser(any(UserDetails.class));
    }

    @Test
    public void testAddUserControllerException() throws Exception {
        UserDetails userDetails = new UserDetails();
        userDetails.setName("John");
        userDetails.setEmail("john@example.com");
        userDetails.setPassword("password");

        // Mocking the service method to throw an exception
        when(userDetailsService.addUser(any(UserDetails.class)))
                .thenThrow(new RuntimeException("Failed to add user"));

        // Convert UserDetails object to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String userDetailsJson = objectMapper.writeValueAsString(userDetails);

        // Perform a POST request to /user/add endpoint
        mockMvc.perform(post("/user/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userDetailsJson))
                .andExpect(status().isInternalServerError());
    }

    @Test
    public void testEditUserControllerSuccess() throws Exception {
        UserDetails userDetails = new UserDetails();
        userDetails.setId(1L);
        userDetails.setName("John");
        userDetails.setEmail("john@example.com");
        userDetails.setPassword("newpassword");

        // Mock the successful edit action
        when(userDetailsService.editUser(any(UserDetails.class))).thenReturn(userDetails);

        // Convert UserDetails object to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String userDetailsJson = objectMapper.writeValueAsString(userDetails);

        // Perform a PUT request to /user/edit endpoint
        mockMvc.perform(put("/user/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userDetailsJson))
                .andExpect(status().isOk());
    }

    @Test
    public void testEditUserControllerException() throws Exception {
        UserDetails userDetails = new UserDetails();
        userDetails.setId(1L);
        userDetails.setName("John");
        userDetails.setEmail("john@example.com");
        userDetails.setPassword("newpassword");

        // Mock the service method to throw an exception
        when(userDetailsService.editUser(any(UserDetails.class)))
                .thenThrow(new RuntimeException("Failed to edit user"));

        // Convert UserDetails object to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String userDetailsJson = objectMapper.writeValueAsString(userDetails);

        // Perform a PUT request to /user/edit endpoint
        mockMvc.perform(put("/user/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userDetailsJson))
                .andExpect(status().isInternalServerError());
    }

    @Test
    public void testDeleteUserControllerSuccess() {
        Long userId = 1L;
        UserController userController = new UserController(userDetailsService);
        ResponseEntity<String> response = userController.deleteUserController(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Deleted successfully", response.getBody());
        verify(userDetailsService, times(1)).deleteUser(userId);
    }

    @Test
    public void testDeleteUserControllerFailure() {
        Long userId = 1L;
        UserController userController = new UserController(userDetailsService);
        doThrow(new RuntimeException("Failed to delete user")).when(userDetailsService).deleteUser(userId);

        ResponseEntity<String> response = userController.deleteUserController(userId);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        verify(userDetailsService, times(1)).deleteUser(userId);
    }

     @Test
    public void testGetAllUsersControllerSuccess() {
        List<UserDetails> users = new ArrayList<>(); // Mocked user details

        // Mocking successful retrieval of user details
        when(userDetailsService.getAllUsers()).thenReturn(users);

        // Invoking the controller method
        UserController userController = new UserController(userDetailsService);
        ResponseEntity<List<UserDetails>> response = userController.getAllUsersController();

        // Asserting the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());

        // Verifying the method call
        verify(userDetailsService, times(1)).getAllUsers();
    }

    @Test
    public void testGetAllUsersControllerException() {
        // Mocking an exception during user details retrieval
        when(userDetailsService.getAllUsers()).thenThrow(new RuntimeException("Failed to fetch users"));

        // Invoking the controller method
        UserController userController = new UserController(userDetailsService);
        ResponseEntity<List<UserDetails>> response = userController.getAllUsersController();

        // Asserting the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody()); // Assuming in case of exception, the body is null

        // Verifying the method call
        verify(userDetailsService, times(1)).getAllUsers();
    }

    @Test
    public void testLoginControllerEmptyResult() {
        UserDetails testUser = new UserDetails();
        testUser.setEmail("test@example.com");
        testUser.setPassword("password"); 

        // Mocking an empty result during user login attempt
        when(userDetailsService.getUsersByQuery(testUser.getEmail(), testUser.getPassword())).thenReturn(new ArrayList<>());

        // Invoking the controller method
        UserController userController = new UserController(userDetailsService);
        ResponseEntity<UserDetails> response = userController.loginController(testUser);

        // Asserting the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody()); // Assuming in case of empty result, the body is null

        // Verifying the method call
        verify(userDetailsService, times(1)).getUsersByQuery(testUser.getEmail(), testUser.getPassword());
    }

    @Test
    public void testLoginControllerException() {
        UserDetails testUser = new UserDetails();
        testUser.setEmail("test@example.com");
        testUser.setPassword("password"); 

        // Mocking an exception during user login attempt
        when(userDetailsService.getUsersByQuery(testUser.getEmail(), testUser.getPassword())).thenThrow(new RuntimeException("Failed to authenticate user"));

        // Invoking the controller method
        UserController userController = new UserController(userDetailsService);
        ResponseEntity<UserDetails> response = userController.loginController(testUser);

        // Asserting the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody()); // Assuming in case of exception, the body is null

        // Verifying the method call
        verify(userDetailsService, times(1)).getUsersByQuery(testUser.getEmail(), testUser.getPassword());
    }

    @Test
    public void testLoginControllerNonEmptyResult() {
        UserDetails testUser = new UserDetails();
        testUser.setEmail("test@example.com");
        testUser.setPassword("password"); 
        UserDetails expectedResult = new UserDetails();
        expectedResult.setEmail("test@example.com");
        expectedResult.setPassword("password"); 

        List<UserDetails> users = new ArrayList<>(); // Mocked user details list
        users.add(expectedResult);

        // Mocking successful retrieval of user details
        when(userDetailsService.getUsersByQuery(testUser.getEmail(), testUser.getPassword())).thenReturn(users);

        // Invoking the controller method
        UserController userController = new UserController(userDetailsService);
        ResponseEntity<UserDetails> response = userController.loginController(testUser);

        // Asserting the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResult, response.getBody());

        // Verifying the method call
        verify(userDetailsService, times(1)).getUsersByQuery(testUser.getEmail(), testUser.getPassword());
    }
}
