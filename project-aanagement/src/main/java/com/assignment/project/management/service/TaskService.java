package com.assignment.project.management.service;

import com.assignment.project.management.entity.Task;
import com.assignment.project.management.entity.UserStory;
import com.assignment.project.management.repository.TaskRepository;
import com.assignment.project.management.repository.UserStoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserStoryRepository storyRepository;

    public TaskService(TaskRepository taskRepository,
            UserStoryRepository storyRepository) {
        this.taskRepository = taskRepository;
        this.storyRepository = storyRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task saveTask(Long storyId, Task task) {
        UserStory story = storyRepository.findById(storyId)
                .orElseThrow(() -> new RuntimeException("Story not found"));

        task.setUserStory(story);

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task task) {
        task.setId(id);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}