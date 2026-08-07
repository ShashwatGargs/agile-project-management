package com.assignment.project.management.service;

import com.assignment.project.management.entity.Project;
import com.assignment.project.management.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return repository.findById(id);
    }

    public Project saveProject(Project project) {
        return repository.save(project);
    }

    public Project updateProject(Long id, Project project) {
        project.setId(id);
        return repository.save(project);
    }

    public void deleteProject(Long id) {
        repository.deleteById(id);
    }
}