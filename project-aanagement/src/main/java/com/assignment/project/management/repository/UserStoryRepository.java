package com.assignment.project.management.repository;

import com.assignment.project.management.entity.UserStory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserStoryRepository extends JpaRepository<UserStory, Long> {
    List<UserStory> findByProjectId(Long projectId);

}