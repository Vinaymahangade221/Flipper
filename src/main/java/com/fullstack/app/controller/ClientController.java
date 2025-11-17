package com.fullstack.app.controller;

import com.fullstack.app.entity.Client;
import com.fullstack.app.service.ClientService;
import com.fullstack.app.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {
    
    @Autowired
    private ClientService clientService;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> createClient(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("designation") String designation,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Client name is required");
        }
        
        if (description == null || description.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Client description is required");
        }
        
        if (designation == null || designation.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Client designation is required");
        }
        
        try {
            Client client = new Client();
            client.setName(name.trim());
            client.setDescription(description.trim());
            client.setDesignation(designation.trim());
            
            if (image != null && !image.isEmpty()) {
                String fileName = fileStorageService.storeFile(image);
                client.setImagePath("/uploads/" + fileName);
            }
            
            Client savedClient = clientService.saveClient(client);
            return ResponseEntity.ok(savedClient);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating client: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable Long id) {
        try {
            if (!clientService.getClientById(id).isPresent()) {
                return ResponseEntity.notFound().build();
            }
            clientService.deleteClient(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting client: " + e.getMessage());
        }
    }
}
