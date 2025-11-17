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
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        Contact savedContact = contactService.saveContact(contact);
        return ResponseEntity.ok(savedContact);
    }
}
