package com.chitter.controllers;

import com.chitter.services.PeepService;
import com.chitter.models.Peep;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/peeps")
public class PeepController {

    private final PeepService peepService;

    public PeepController(PeepService peepService) {
        this.peepService = peepService;
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<Peep> addPeepController(@RequestBody Peep newPeepData, @PathVariable Long userId) {
        System.out.println("I entered the controller");
        try {
            Peep newPeep = peepService.addPeep(newPeepData, userId);
            return new ResponseEntity<>(newPeep, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/edit")
    public ResponseEntity<Peep> editPeepController(@RequestBody Peep editedPeepData) {
        try {
            Peep editedPeep = peepService.editPeep(editedPeepData);
            return new ResponseEntity<>(editedPeep, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePeepController(@PathVariable Long id) {
        try {
            peepService.deletePeep(id);
            return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error deleting peep", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Peep>> getAllPeepController() {
        try {
            List<Peep> result = peepService.getAllPeeps();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
