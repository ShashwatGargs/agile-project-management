package com.assignment.project.management.controller;

import com.assignment.project.management.entity.Project;
import com.assignment.project.management.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projects")
@CrossOrigin("*")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return service.getAllProjects();
    }

    @GetMapping("/{id}")
    public Optional<Project> getProject(@PathVariable Long id) {
        return service.getProjectById(id);
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return service.saveProject(project);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id,
                                 @RequestBody Project project) {
        return service.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        service.deleteProject(id);
    }
}