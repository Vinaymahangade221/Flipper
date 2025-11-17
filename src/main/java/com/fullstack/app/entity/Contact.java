package com.fullstack.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String mobile;
    
    @Column(nullable = false)
    private String city;
    
    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;
    
    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
    }
}
