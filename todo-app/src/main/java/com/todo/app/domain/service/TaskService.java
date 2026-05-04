package com.todo.app.domain.service;

import com.todo.app.application.dto.request.CreateTaskDTO;
import com.todo.app.application.dto.response.TaskResponseDTO;
import com.todo.app.application.usecases.CreateTaskUseCase;
import com.todo.app.domain.model.Task;
import com.todo.app.domain.port.out.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService implements CreateTaskUseCase {

    private final TaskRepository taskRepository;

    @Override
    public TaskResponseDTO createTask(CreateTaskDTO dto, String userId) {
        Task task = Task.builder()
                .taskId(UUID.randomUUID().toString())
                .userId(userId)
                .description(dto.description())
                .check(false)
                .build();

        Task saved = taskRepository.save(task);
        return new TaskResponseDTO(saved.getTaskId(), saved.getDescription(), saved.isCheck());
    }
}
