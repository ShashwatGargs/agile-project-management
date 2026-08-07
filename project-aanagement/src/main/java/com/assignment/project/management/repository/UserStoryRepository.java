package com.assignment.project.management.repository;

import com.assignment.project.management.entity.UserStory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStoryRepository extends JpaRepository<UserStory, Long> {
}