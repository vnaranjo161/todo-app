package com.todo.app.application.usecases.tasks;

import com.todo.app.application.dto.request.CreateTaskDTO;
import com.todo.app.application.dto.response.TaskResponseDTO;

public interface CreateTaskUseCase {

    TaskResponseDTO createTask(CreateTaskDTO dto, String userId);
}
