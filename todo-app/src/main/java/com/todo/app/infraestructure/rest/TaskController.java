package com.todo.app.infraestructure.rest;

import com.todo.app.application.dto.request.CreateTaskDTO;
import com.todo.app.application.dto.response.TaskResponseDTO;
import com.todo.app.application.usecases.CreateTaskUseCase;
import com.todo.app.infraestructure.security.AuthenticatedUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final CreateTaskUseCase createTaskUseCase;
    private final AuthenticatedUserService authenticatedUserService;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@Valid @RequestBody CreateTaskDTO dto) {
        String userId = authenticatedUserService.getAuthenticatedUserId();
        TaskResponseDTO response = createTaskUseCase.createTask(dto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
