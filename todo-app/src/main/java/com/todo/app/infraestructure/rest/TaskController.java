package com.todo.app.infraestructure.rest;

import com.todo.app.application.dto.request.CreateTaskDTO;
import com.todo.app.application.dto.request.UpdateTaskStatusDTO;
import com.todo.app.application.dto.response.TaskResponseDTO;
import com.todo.app.application.usecases.tasks.CreateTaskUseCase;
import com.todo.app.application.usecases.tasks.DeleteTaskUseCase;
import com.todo.app.application.usecases.tasks.GetUserTasksUseCase;
import com.todo.app.application.usecases.tasks.UpdateTaskStatusUseCase;
import com.todo.app.infraestructure.security.AuthenticatedUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final CreateTaskUseCase createTaskUseCase;
    private final UpdateTaskStatusUseCase updateTaskStatusUseCase;
    private final GetUserTasksUseCase getUserTasksUseCase;
    private final DeleteTaskUseCase deleteTaskUseCase;
    private final AuthenticatedUserService authenticatedUserService;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@Valid @RequestBody CreateTaskDTO dto) {
        String userId = authenticatedUserService.getAuthenticatedUserId();
        TaskResponseDTO response = createTaskUseCase.createTask(dto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getUserTasks() {
        String userId = authenticatedUserService.getAuthenticatedUserId();
        return ResponseEntity.ok(getUserTasksUseCase.getUserTasks(userId));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> delete(@PathVariable String taskId) {
        String userId = authenticatedUserService.getAuthenticatedUserId();
        deleteTaskUseCase.deleteTask(taskId, userId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{taskId}")
    public ResponseEntity<TaskResponseDTO> updateStatus(
            @PathVariable String taskId,
            @Valid @RequestBody UpdateTaskStatusDTO dto) {
        String userId = authenticatedUserService.getAuthenticatedUserId();
        TaskResponseDTO response = updateTaskStatusUseCase.updateTaskStatus(taskId, dto, userId);
        return ResponseEntity.ok(response);
    }
}
