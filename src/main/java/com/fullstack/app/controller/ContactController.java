package com.fullstack.app.controller;

import com.fullstack.app.entity.Contact;
import com.fullstack.app.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {
    
    @Autowired
    private ContactService contactService;
    
    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }
    
    @PostMapping
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        if (contact.getFullName() == null || contact.getFullName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Full name is required");
        }
        if (contact.getEmail() == null || contact.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (contact.getMobile() == null || contact.getMobile().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Mobile number is required");
        }
        if (contact.getCity() == null || contact.getCity().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("City is required");
        }
        
        try {
            Contact savedContact = contactService.saveContact(contact);
            return ResponseEntity.ok(savedContact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving contact: " + e.getMessage());
        }
    }
}
