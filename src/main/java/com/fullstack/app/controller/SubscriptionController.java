package com.fullstack.app.controller;

import com.fullstack.app.entity.Subscription;
import com.fullstack.app.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "*")
public class SubscriptionController {
    
    @Autowired
    private SubscriptionService subscriptionService;
    
    @GetMapping
    public List<Subscription> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }
    
    @PostMapping
    public ResponseEntity<?> createSubscription(@RequestBody Subscription subscription) {
        try {
            Subscription savedSubscription = subscriptionService.saveSubscription(subscription);
            return ResponseEntity.ok(savedSubscription);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
