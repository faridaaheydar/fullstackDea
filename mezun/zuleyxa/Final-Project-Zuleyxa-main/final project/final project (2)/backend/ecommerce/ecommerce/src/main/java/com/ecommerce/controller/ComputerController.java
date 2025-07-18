package com.ecommerce.controller;

import com.ecommerce.entity.Computer;
import com.ecommerce.service.ComputerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/computers")
public class ComputerController {

    @Autowired
    private ComputerService computerService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('USER')")

    public ResponseEntity<Computer> addComputer(@RequestBody Computer computer) {
        Computer createdComputer = computerService.addComputer(computer);
        return new ResponseEntity<>(createdComputer, HttpStatus.CREATED);
    }

    @GetMapping("/all")

    public ResponseEntity<List<Computer>> getAllComputers() {
        List<Computer> computers = computerService.getAllComputers();
        return new ResponseEntity<>(computers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Computer> getComputerById(@PathVariable Long id) {
        Optional<Computer> computer = computerService.getComputerById(id);
        return computer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Computer> updateComputer(@PathVariable Long id, @RequestBody Computer computer) {
        Computer updatedComputer = computerService.updateComputer(id, computer);
        return updatedComputer != null ? new ResponseEntity<>(updatedComputer, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteComputer(@PathVariable Long id) {
        boolean isDeleted = computerService.deleteComputer(id);
        return isDeleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
