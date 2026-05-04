package com.todo.app.domain.port.out;

import com.todo.app.domain.model.Task;

public interface TaskRepository {

    Task save(Task task);
}
