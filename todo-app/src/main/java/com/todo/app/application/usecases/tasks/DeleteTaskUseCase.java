package com.todo.app.application.usecases.tasks;

public interface DeleteTaskUseCase {

    void deleteTask(String taskId, String userId);
}
