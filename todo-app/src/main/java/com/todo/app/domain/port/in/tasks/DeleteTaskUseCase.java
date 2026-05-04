package com.todo.app.domain.port.in.tasks;

public interface DeleteTaskUseCase {

    void deleteTask(String taskId, String userId);
}
