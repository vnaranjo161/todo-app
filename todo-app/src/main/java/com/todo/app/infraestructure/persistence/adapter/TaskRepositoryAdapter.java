package com.todo.app.infraestructure.persistence.adapter;

import com.todo.app.domain.model.Task;
import com.todo.app.domain.port.out.TaskRepository;
import com.todo.app.infraestructure.persistence.entity.TaskDocument;
import com.todo.app.infraestructure.persistence.repository.TaskMongoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TaskRepositoryAdapter implements TaskRepository {

    private final TaskMongoRepository mongoRepository;

    @Override
    public Task save(Task task) {
        TaskDocument document = TaskDocument.builder()
                .id(task.getTaskId())
                .userId(task.getUserId())
                .description(task.getDescription())
                .check(task.isCheck())
                .createdAt(task.getCreatedAt())
                .build();

        return taskDocumentToTask(mongoRepository.save(document));
    }

    @Override
    public Optional<Task> findByTaskIdAndUserId(String taskId, String userId) {
        return mongoRepository.findByIdAndUserId(taskId, userId)
                .map(this::taskDocumentToTask);
    }

    @Override
    public List<Task> findAllByUserId(String userId) {
        return mongoRepository.findAllByUserIdOrderByCreatedAtAsc(userId).stream()
                .map(this::taskDocumentToTask)
                .toList();
    }

    @Override
    public void deleteById(String taskId) {
        mongoRepository.deleteById(taskId);
    }

    private Task taskDocumentToTask(TaskDocument document) {
        return Task.builder()
                .taskId(document.getId())
                .userId(document.getUserId())
                .description(document.getDescription())
                .check(document.isCheck())
                .createdAt(document.getCreatedAt())
                .build();
    }
}
