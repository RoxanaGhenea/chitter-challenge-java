package com.chitter;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.chitter.controllers.PeepController;
import com.chitter.models.Peep;
import com.chitter.models.UserDetails;
import com.chitter.services.PeepService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class PeepControllerTests {

    @Autowired
    private PeepController peepController;

    @MockBean
    private PeepService peepService;

    @Test
    public void testAddPeepControllerSuccess() {
        // Prepare test data
        UserDetails testUser = new UserDetails();
        testUser.setId(1L);
        testUser.setUsername("testuser");

        Peep mockPeep = new Peep();
        mockPeep.setId(1L);
        mockPeep.setContent("Test peep content");

        // Mock peepService behavior
        when(peepService.addPeep(any(Peep.class), anyLong())).thenReturn(mockPeep);

        // Call the controller method
        ResponseEntity<Peep> response = peepController.addPeepController(mockPeep, testUser.getId());

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockPeep, response.getBody());

        // Verify peepService method was called
        verify(peepService, times(1)).addPeep(any(Peep.class), eq(testUser.getId()));
    }

    @Test
    public void testAddPeepControllerInternalServerError() {
        // Prepare test data
        UserDetails testUser = new UserDetails();
        testUser.setId(1L);
        testUser.setUsername("testuser");

        // Mock peepService to throw an exception
        when(peepService.addPeep(any(Peep.class), anyLong())).thenThrow(new RuntimeException("Error message"));

        // Call the controller method
        ResponseEntity<Peep> response = peepController.addPeepController(new Peep(), testUser.getId());

        // Verify the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verify peepService method was called
        verify(peepService, times(1)).addPeep(any(Peep.class), eq(testUser.getId()));
    }

    @Test
    public void testEditPeepControllerSuccess() {
        // Prepare test data
        Peep editedPeep = new Peep();
        editedPeep.setId(1L);
        editedPeep.setContent("Updated peep content");

        // Mock peepService behavior
        when(peepService.editPeep(any(Peep.class))).thenReturn(editedPeep);

        // Call the controller method
        ResponseEntity<Peep> response = peepController.editPeepController(editedPeep);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(editedPeep, response.getBody());

        // Verify peepService method was called
        verify(peepService, times(1)).editPeep(any(Peep.class));
    }

    @Test
    public void testEditPeepControllerInternalServerError() {
        // Mock peepService to throw an exception
        when(peepService.editPeep(any(Peep.class))).thenThrow(new RuntimeException("Error message"));

        // Call the controller method
        ResponseEntity<Peep> response = peepController.editPeepController(new Peep());

        // Verify the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verify peepService method was called
        verify(peepService, times(1)).editPeep(any(Peep.class));
    }

    @Test
    public void testDeletePeepController_Success() {
        // Mock peepService to perform deletion without throwing an exception
        doNothing().when(peepService).deletePeep(anyLong());

        // Call the controller method
        ResponseEntity<String> response = peepController.deletePeepController(1L); // Assuming an ID for deletion

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Deleted successfully", response.getBody());

        // Verify peepService method was called
        verify(peepService, times(1)).deletePeep(anyLong());
    }

    @Test
    public void testDeletePeepController_InternalServerError() {
        // Mock peepService to throw an exception when attempting to delete
        doThrow(new RuntimeException("Error deleting peep")).when(peepService).deletePeep(anyLong());

        // Call the controller method
        ResponseEntity<String> response = peepController.deletePeepController(1L); // Assuming an ID for deletion

        // Verify the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Error deleting peep", response.getBody());

        // Verify peepService method was called
        verify(peepService, times(1)).deletePeep(anyLong());
    }

    @Test
    public void testGetAllPeepController_Success() {
        // Prepare test data
        List<Peep> peeps = new ArrayList<>();
        Peep peep1 = new Peep();
        peep1.setId(1L);
        peep1.setContent("Content 1");
        peeps.add(peep1);

        Peep peep2 = new Peep();
        peep2.setId(2L);
        peep2.setContent("Content 2");
        peeps.add(peep2);

        // Mock peepService behavior
        when(peepService.getAllPeeps()).thenReturn(peeps);

        // Call the controller method
        ResponseEntity<List<Peep>> response = peepController.getAllPeepController();

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(peeps, response.getBody());

        // Verify peepService method was called
        verify(peepService, times(1)).getAllPeeps();
    }

    @Test
    public void testGetAllPeepController_InternalServerError() {
        // Mock peepService to throw an exception when attempting to get all peeps
        when(peepService.getAllPeeps()).thenThrow(new RuntimeException("Error getting all peeps"));

        // Call the controller method
        ResponseEntity<List<Peep>> response = peepController.getAllPeepController();

        // Verify the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());

        // Verify peepService method was called
        verify(peepService, times(1)).getAllPeeps();
    }
}
