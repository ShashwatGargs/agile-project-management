package com.assignment.project.management.service;

import com.assignment.project.management.entity.Project;
import com.assignment.project.management.entity.UserStory;
import com.assignment.project.management.repository.ProjectRepository;
import com.assignment.project.management.repository.UserStoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserStoryService {

    private final UserStoryRepository storyRepository;
    private final ProjectRepository projectRepository;

    public UserStoryService(UserStoryRepository storyRepository,
            ProjectRepository projectRepository) {
        this.storyRepository = storyRepository;
        this.projectRepository = projectRepository;
    }

    public List<UserStory> getAllStories() {
        return storyRepository.findAll();
    }

    public Optional<UserStory> getStoryById(Long id) {
        return storyRepository.findById(id);
    }

    public UserStory saveStory(Long projectId, UserStory story) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        story.setProject(project);

        return storyRepository.save(story);
    }

    public UserStory updateStory(Long id, UserStory story) {
        story.setId(id);
        return storyRepository.save(story);
    }

    public void deleteStory(Long id) {
        storyRepository.deleteById(id);
    }
}