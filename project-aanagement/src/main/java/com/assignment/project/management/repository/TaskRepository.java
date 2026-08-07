package com.assignment.project.management.repository;

import com.assignment.project.management.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}