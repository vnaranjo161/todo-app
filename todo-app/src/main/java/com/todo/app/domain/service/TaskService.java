package com.todo.app.domain.service;

import com.todo.app.application.dto.request.CreateTaskDTO;
import com.todo.app.application.dto.request.UpdateTaskStatusDTO;
import com.todo.app.application.dto.response.TaskResponseDTO;
import com.todo.app.application.usecases.tasks.CreateTaskUseCase;
import com.todo.app.application.usecases.tasks.GetUserTasksUseCase;
import com.todo.app.application.usecases.tasks.UpdateTaskStatusUseCase;
import com.todo.app.domain.exception.TaskNotFoundException;
import com.todo.app.domain.model.Task;
import com.todo.app.domain.port.out.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService implements CreateTaskUseCase, UpdateTaskStatusUseCase, GetUserTasksUseCase {

    private final TaskRepository taskRepository;

    @Override
    public TaskResponseDTO createTask(CreateTaskDTO dto, String userId) {
        Task task = Task.builder()
                .taskId(UUID.randomUUID().toString())
                .userId(userId)
                .description(dto.description())
                .check(false)
                .createdAt(Instant.now())
                .build();

        Task saved = taskRepository.save(task);
        return toResponse(saved);
    }

    @Override
    public TaskResponseDTO updateTaskStatus(String taskId, UpdateTaskStatusDTO dto, String userId) {

        Task existing = taskRepository.findByTaskIdAndUserId(taskId, userId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        existing.setCheck(dto.check());

        Task saved = taskRepository.save(existing);
        return toResponse(saved);

    }

    @Override
    public List<TaskResponseDTO> getUserTasks(String userId) {
        return taskRepository.findAllByUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    private TaskResponseDTO toResponse(Task task) {
        return new TaskResponseDTO(task.getTaskId(), task.getDescription(), task.isCheck());
    }
}
