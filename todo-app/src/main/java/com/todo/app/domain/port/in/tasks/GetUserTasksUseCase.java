package com.todo.app.domain.port.in.tasks;

import com.todo.app.application.dto.response.TaskResponseDTO;

import java.util.List;

public interface GetUserTasksUseCase {

    List<TaskResponseDTO> getUserTasks(String userId);
}
