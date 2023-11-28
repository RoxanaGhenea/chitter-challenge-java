package com.chitter;
import com.chitter.models.Peep;
import com.chitter.repositories.PeepRepository;
import com.chitter.services.PeepService;
import com.chitter.models.UserDetails;
import com.chitter.repositories.UserDetailsRepository;
import com.chitter.services.UserDetailsService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@SpringBootTest
class ChitterApplicationTests {
	@Mock
    private UserDetailsRepository userDetailsRepository;

	@Mock
    private PeepRepository peepRepository;

    @InjectMocks
    private UserDetailsService userDetailsService;

	@InjectMocks
    private PeepService peepService;

	// Below tests are for the UserDetailsService.java and UserDetails.java
	@Test
    public void testAddUser() {
        UserDetails newUser = new UserDetails();
        newUser.setId(7L); 
        newUser.setAvatar("");
        newUser.setEmail("newuser@test.com");
        newUser.setName("New User");
        newUser.setPassword("password");
        newUser.setUsername("newuser");

        Mockito.when(userDetailsRepository.save(Mockito.any(UserDetails.class))).thenReturn(newUser);

        UserDetails addedUser = userDetailsService.addUser(newUser);

        Assertions.assertNotNull(addedUser);
        Assertions.assertEquals("newuser@test.com", addedUser.getEmail());
        Assertions.assertEquals("New User", addedUser.getName());
        Assertions.assertEquals("password", addedUser.getPassword());
        Assertions.assertEquals("newuser", addedUser.getUsername());
		Assertions.assertEquals("", addedUser.getAvatar());
    }

	@Test
    public void testAddUserExceptionHandling() {
        UserDetails newUser = new UserDetails();

        doThrow(RuntimeException.class).when(userDetailsRepository).save(any());

        assertThrows(RuntimeException.class, () -> userDetailsService.addUser(newUser));
    }

	@Test
	public void testEditUser() {
		// Mocking an existing user with id = 1
		UserDetails existingUser = new UserDetails();
		existingUser.setId(1L);
		existingUser.setEmail("test10@test");
		existingUser.setName("roxghenea");
		existingUser.setPassword("andreea");
		existingUser.setUsername("rghe");

		// Set existing user details
		when(userDetailsRepository.findById(1L)).thenReturn(Optional.of(existingUser));
		when(userDetailsRepository.save(any())).thenReturn(existingUser);

		UserDetails updatedUser = userDetailsService.editUser(existingUser);

		assertEquals(existingUser, updatedUser);
		verify(userDetailsRepository, times(1)).findById(existingUser.getId());
		verify(userDetailsRepository, times(1)).save(existingUser);
	}

	@Test
    public void testEditUserUserNotFound() {
        UserDetails editedUser = new UserDetails();
        editedUser.setId(4L);

        when(userDetailsRepository.findById(4L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> userDetailsService.editUser(editedUser));
    }

	@Test
    public void testEditUserExceptionHandling() {
        UserDetails editedUser = new UserDetails();
        editedUser.setId(1L);

        when(userDetailsRepository.findById(anyLong())).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> userDetailsService.editUser(editedUser));
    }

	@Test
    public void testDeleteUser() {
        Long userId = 1L;

        when(userDetailsRepository.findById(userId)).thenReturn(Optional.of(new UserDetails()));

        userDetailsService.deleteUser(userId);

        verify(userDetailsRepository, times(1)).deleteById(userId);
    }

	@Test
    public void testDeleteUserExceptionHandling() {
        Long userId = 1L;

        doThrow(RuntimeException.class).when(userDetailsRepository).deleteById(anyLong());

        assertThrows(RuntimeException.class, () -> userDetailsService.deleteUser(userId));
    }

	@Test
    public void testGetAllUsers() {
        UserDetails user1 = new UserDetails();
        user1.setId(1L);
        user1.setAvatar("");
        user1.setEmail("test12@test");
        user1.setName("andre");
        user1.setPassword("rghe");
        user1.setUsername("roxgh");
		user1.setAvatar("");

        UserDetails user2 = new UserDetails();
        user2.setId(2L);
        user2.setAvatar("");
        user2.setEmail("test7@test");
        user2.setName("andre");
        user2.setPassword("aghe");
        user2.setUsername("andre");

        Mockito.when(userDetailsRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<UserDetails> userList = userDetailsService.getAllUsers();

        Assertions.assertEquals(2, userList.size());
        Assertions.assertEquals("test12@test", userList.get(0).getEmail());
        Assertions.assertEquals("test7@test", userList.get(1).getEmail());
    }

	@Test
    public void testGetAllUsersExceptionHandling() {
        when(userDetailsRepository.findAll()).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> userDetailsService.getAllUsers());
    }

	@Test
	public void testGetUsersByQuery() {
		String email = "test7@test.com";
		String password = "andre";

		// Create a list of UserDetails with mock data
		List<UserDetails> userList = new ArrayList<>();
		UserDetails user1 = new UserDetails();
		user1.setId(2L);
		user1.setEmail("test7@test.com");
		user1.setPassword("andre");
		userList.add(user1);

		UserDetails user2 = new UserDetails();
		user2.setId(5L);
		user2.setEmail("test20@test.com");
		user2.setPassword("ramo");
		userList.add(user2);

		// Mock the behavior of repository method
		when(userDetailsRepository.findByEmailAndPassword(email, password)).thenReturn(userList);

		// Call the service method
		List<UserDetails> retrievedUsers = userDetailsService.getUsersByQuery(email, password);

		// Assertions
		assertEquals(userList, retrievedUsers);
		verify(userDetailsRepository, times(1)).findByEmailAndPassword(email, password);
	}

	@Test
    public void testGetUsersByQueryExceptionHandling() {
        String email = "test@test.com";
        String password = "password";

        when(userDetailsRepository.findByEmailAndPassword(email, password))
                .thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class,
                () -> userDetailsService.getUsersByQuery(email, password));
    }

	@Test
    public void testGetUsersByQuerySuccess() {
        String query = "testQuery";

        when(userDetailsRepository.findByCustomQuery(query))
                .thenReturn(Collections.emptyList());

        assertEquals(Collections.emptyList(), userDetailsService.getUsersByQuery(query));
    }

	@Test
    public void testGetUsersByQuery1ExceptionHandling() {
        String query = "testQuery";

        when(userDetailsRepository.findByCustomQuery(query))
                .thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> userDetailsService.getUsersByQuery(query));
    }

	@Test
	public void testUserPeepGetterSetter() {
		UserDetails userDetails = new UserDetails();
		userDetails.setId(1L);

		List<Peep> peeps = new ArrayList<>();
		Peep peep1 = new Peep();
		peep1.setContent("Hello world!");
		peep1.setId(1L);
		peep1.setUser(userDetails);
		peep1.setDate(LocalDateTime.now());

		Peep peep2 = new Peep();
		peep2.setContent("Hello universe!");
		peep2.setId(2L);
		peep1.setUser(userDetails);
		peep2.setDate(LocalDateTime.now());

		peeps.add(peep1);
		peeps.add(peep2);

		userDetails.setPeeps(peeps);

		List<Peep> retrievedPeeps = userDetails.getPeeps();
		assertEquals(peeps, retrievedPeeps);
	}

	// Below tests are for PeepService.java and Peep.java
	@Test
    public void testAddPeep() {
        UserDetails user = new UserDetails();
        user.setId(1L);
        when(userDetailsRepository.findById(1L)).thenReturn(Optional.of(user));

        Peep newPeep = new Peep();
		newPeep.setUser(user);
        newPeep.setContent("New peep content");
		newPeep.setDate(LocalDateTime.now());

        when(peepRepository.save(any())).thenReturn(newPeep);

        Peep addedPeep = peepService.addPeep(newPeep, 1L);

        assertNotNull(addedPeep);
        assertEquals(newPeep.getContent(), addedPeep.getContent());
        assertNotNull(addedPeep.getDate());
        assertEquals(user.getId(), addedPeep.getUserId());
    }

	@Test
    public void testAddPeepWhenUserNotFound() {
        Long userId = 1L;

        when(userDetailsRepository.findById(userId)).thenReturn(Optional.empty());

        // Test if UserNotFoundException is thrown
        assertThrows(IllegalArgumentException.class, () -> {
            peepService.addPeep(new Peep(), userId);
        });
    }

    @Test
    public void testEditPeep() {
        Peep existingPeep = new Peep();
        existingPeep.setId(1L);
        existingPeep.setContent("Existing peep content");
		existingPeep.setDate(LocalDateTime.now());

        when(peepRepository.findById(anyLong())).thenReturn(Optional.of(existingPeep));

        Peep updatedPeep = new Peep();
        updatedPeep.setId(1L);
        updatedPeep.setContent("Updated peep content");
		updatedPeep.setDate(LocalDateTime.now());

        when(peepRepository.save(any())).thenReturn(updatedPeep);

        Peep editedPeep = peepService.editPeep(updatedPeep);

        assertNotNull(editedPeep);
        assertEquals(updatedPeep.getContent(), editedPeep.getContent());
		assertEquals(updatedPeep.getId(), editedPeep.getId());
		assertNotEquals(existingPeep.getDate(), editedPeep.getDate());
		assertEquals(updatedPeep.getUserId(), editedPeep.getUserId());
		assertEquals(updatedPeep.getUser(), editedPeep.getUser());
    }

	@Test
    public void testEditPeepPeepNotFound() {
        Peep editedPeep = new Peep();
        editedPeep.setId(1L);
        editedPeep.setContent("Edited peep content");
        editedPeep.setDate(LocalDateTime.now());

        when(peepRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> peepService.editPeep(editedPeep));

        verify(peepRepository, times(1)).findById(editedPeep.getId());
        
        verify(peepRepository, never()).save(any());
    }

    @Test
    public void testDeletePeep() {
        Long peepId = 1L;

        peepService.deletePeep(peepId);

        verify(peepRepository, times(1)).deleteById(peepId);
    }

	@Test
    public void testDeletePeepExceptionCaught() {
        Long peepDataId = 1L;

        // Mocking the behavior of deleteById to throw an exception when called
        doThrow(new RuntimeException("Failed to delete peep")).when(peepRepository).deleteById(anyLong());

        try {
            peepService.deletePeep(peepDataId);
        } catch (Exception e) {
            assertNotNull(e);
            assertEquals("Failed to delete peep", e.getMessage());
        }

        verify(peepRepository, times(1)).deleteById(peepDataId);
    }

    @Test
    public void testGetAllPeeps() {
        Peep peep1 = new Peep();
        peep1.setId(1L);
        peep1.setContent("Peep 1 content");
        peep1.setDate(LocalDateTime.now().minusDays(1));

        Peep peep2 = new Peep();
        peep2.setId(2L);
        peep2.setContent("Peep 2 content");
        peep2.setDate(LocalDateTime.now());

        List<Peep> peeps = new ArrayList<>(); // Use ArrayList for mutable list
        peeps.add(peep1);
        peeps.add(peep2);

        when(peepRepository.findByDateIsNotNull()).thenReturn(peeps);

        List<Peep> allPeeps = peepService.getAllPeeps();

        assertNotNull(allPeeps);
        assertEquals(2, allPeeps.size());
        assertEquals("Peep 2 content", allPeeps.get(0).getContent());
    }

	@Test
    public void testGetAllPeepsCatchBlock() {
        RuntimeException expectedException = new RuntimeException("Error while retrieving peeps");

        when(peepRepository.findByDateIsNotNull()).thenThrow(expectedException);

        RuntimeException thrownException = assertThrows(RuntimeException.class, () -> {
            peepService.getAllPeeps();
        });

        assertEquals(expectedException.getMessage(), thrownException.getMessage());
    }

}
