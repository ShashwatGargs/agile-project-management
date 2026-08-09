package com.assignment.project.management.controller;

import com.assignment.project.management.entity.UserStory;
import com.assignment.project.management.service.UserStoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stories")
@CrossOrigin("*")
public class UserStoryController {

    private final UserStoryService service;

    public UserStoryController(UserStoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserStory> getAllStories() {
        return service.getAllStories();
    }

    @GetMapping("/{id}")
    public Optional<UserStory> getStory(@PathVariable Long id) {
        return service.getStoryById(id);
    }

    @PostMapping("/project/{projectId}")
    public UserStory createStory(@PathVariable Long projectId,
            @RequestBody UserStory story) {

        return service.saveStory(projectId, story);
    }

    @PutMapping("/{id}")
    public UserStory updateStory(@PathVariable Long id,
            @RequestBody UserStory story) {
        return service.updateStory(id, story);
    }

    @DeleteMapping("/{id}")
    public void deleteStory(@PathVariable Long id) {
        service.deleteStory(id);
    }

    @GetMapping("/project/{projectId}")
    public List<UserStory> getStoriesByProject(@PathVariable Long projectId) {
        return service.getStoriesByProject(projectId);
    }
}