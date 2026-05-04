package com.todo.app.domain.port.out;

import com.todo.app.domain.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskRepository {

    Task save(Task task);
    Optional<Task> findByTaskIdAndUserId(String taskId, String userId);
    List<Task> findAllByUserId(String userId);
}
