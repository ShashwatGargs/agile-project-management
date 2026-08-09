package com.assignment.project.management.controller;

import com.assignment.project.management.entity.Task;
import com.assignment.project.management.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return service.getAllTasks();
    }

    @GetMapping("/{id}")
    public Optional<Task> getTask(@PathVariable Long id) {
        return service.getTaskById(id);
    }

    @PostMapping("/story/{storyId}")
    public Task createTask(@PathVariable Long storyId,
            @RequestBody Task task) {

        return service.saveTask(storyId, task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,
            @RequestBody Task task) {
        return service.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }

    @GetMapping("/story/{storyId}")
    public List<Task> getTasksByStory(@PathVariable Long storyId) {
        return service.getTasksByStory(storyId);
    }
}