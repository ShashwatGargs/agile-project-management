package com.assignment.project.management.scheduler;

import com.assignment.project.management.entity.Task;
import com.assignment.project.management.enums.TaskStatus;
import com.assignment.project.management.repository.TaskRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class OverdueTaskScheduler {

    private final TaskRepository repository;

    public OverdueTaskScheduler(TaskRepository repository) {
        this.repository = repository;
    }

    @Scheduled(fixedRate = 60000)
    public void markOverdueTasks() {
        System.out.println("Scheduler running...");
        List<Task> tasks = repository.findAll();

        for (Task task : tasks) {

            if (task.getDueDate() != null
                    && task.getDueDate().isBefore(LocalDate.now())
                    && task.getStatus() != TaskStatus.DONE) {

                task.setStatus(TaskStatus.OVERDUE);
                repository.save(task);

                System.out.println("Task " + task.getId() + " marked OVERDUE");
            }
        }
    }
}