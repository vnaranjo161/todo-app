package com.todo.app.domain.port.in.tasks;

import com.todo.app.application.dto.request.CreateTaskDTO;
import com.todo.app.application.dto.response.TaskResponseDTO;

public interface CreateTaskUseCase {

    TaskResponseDTO createTask(CreateTaskDTO dto, String userId);
}
