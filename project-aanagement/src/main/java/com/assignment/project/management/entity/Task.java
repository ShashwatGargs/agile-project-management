package com.assignment.project.management.entity;

import com.assignment.project.management.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private String assignee;

    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "story_id")
    @JsonBackReference
    private UserStory userStory;
}