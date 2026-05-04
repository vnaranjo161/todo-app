package com.todo.app.domain.exception;

public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(String taskId) {
        super("Tarea no encontrada: " + taskId);
    }
}
