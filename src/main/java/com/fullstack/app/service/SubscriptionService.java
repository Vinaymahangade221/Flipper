package com.fullstack.app.service;

import com.fullstack.app.entity.Subscription;
import com.fullstack.app.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {
    
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }
    
    public Subscription saveSubscription(Subscription subscription) {
        if (subscriptionRepository.existsByEmail(subscription.getEmail())) {
            throw new RuntimeException("Email already subscribed");
        }
        return subscriptionRepository.save(subscription);
    }
}
