package com.fullstack.app.service;

import com.fullstack.app.entity.Contact;
import com.fullstack.app.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {
    
    @Autowired
    private ContactRepository contactRepository;
    
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }
    
    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }
}
