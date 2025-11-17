package com.fullstack.app.controller;

import com.fullstack.app.entity.Project;
import com.fullstack.app.service.FileStorageService;
import com.fullstack.app.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        
        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.storeFile(image);
            project.setImagePath("/uploads/" + fileName);
        }
        
        Project savedProject = projectService.saveProject(project);
        return ResponseEntity.ok(savedProject);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
