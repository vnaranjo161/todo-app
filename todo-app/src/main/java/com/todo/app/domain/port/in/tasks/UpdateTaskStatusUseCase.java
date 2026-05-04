package com.todo.app.domain.port.in.tasks;

import com.todo.app.application.dto.request.UpdateTaskStatusDTO;
import com.todo.app.application.dto.response.TaskResponseDTO;

public interface UpdateTaskStatusUseCase {

    TaskResponseDTO updateTaskStatus(String taskId, UpdateTaskStatusDTO dto, String userId);
}
