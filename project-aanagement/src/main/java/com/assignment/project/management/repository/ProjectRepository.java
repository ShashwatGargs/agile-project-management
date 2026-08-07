package com.assignment.project.management.repository;

import com.assignment.project.management.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}