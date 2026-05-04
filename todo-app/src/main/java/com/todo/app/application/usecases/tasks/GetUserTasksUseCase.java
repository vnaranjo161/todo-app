package com.todo.app.application.usecases.tasks;

import com.todo.app.application.dto.response.TaskResponseDTO;

import java.util.List;

public interface GetUserTasksUseCase {

    List<TaskResponseDTO> getUserTasks(String userId);
}
