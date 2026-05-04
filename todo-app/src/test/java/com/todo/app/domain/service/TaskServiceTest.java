package com.todo.app.domain.service;

import com.todo.app.application.dto.request.CreateTaskDTO;
import com.todo.app.application.dto.request.UpdateTaskStatusDTO;
import com.todo.app.application.dto.response.TaskResponseDTO;
import com.todo.app.application.service.TaskService;
import com.todo.app.domain.exception.TaskNotFoundException;
import com.todo.app.domain.model.Task;
import com.todo.app.domain.port.out.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    // --- createTask ---

    @Test
    void createTask_returnsResponseWithDescriptionAndCheckFalse() {
        CreateTaskDTO dto = new CreateTaskDTO("Buy groceries");
        when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        TaskResponseDTO response = taskService.createTask(dto, "user-1");

        assertThat(response.description()).isEqualTo("Buy groceries");
        assertThat(response.check()).isFalse();
        assertThat(response.taskId()).isNotBlank();
    }

    @Test
    void createTask_alwaysSetsCheckToFalse() {
        CreateTaskDTO dto = new CreateTaskDTO("Some task");
        when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        TaskResponseDTO response = taskService.createTask(dto, "user-1");

        assertThat(response.check()).isFalse();
        verify(taskRepository).save(argThat(task -> !task.isCheck()));
    }

    // --- updateTaskStatus ---

    @Test
    void updateTaskStatus_returnsUpdatedCheck_whenTaskBelongsToUser() {
        Task existing = buildTask("task-1", "user-1", false);
        when(taskRepository.findByTaskIdAndUserId("task-1", "user-1")).thenReturn(Optional.of(existing));
        when(taskRepository.save(existing)).thenReturn(existing);

        TaskResponseDTO response = taskService.updateTaskStatus("task-1", new UpdateTaskStatusDTO(true), "user-1");

        assertThat(response.check()).isTrue();
        assertThat(response.taskId()).isEqualTo("task-1");
    }

    @Test
    void updateTaskStatus_throwsTaskNotFoundException_whenTaskNotFound() {
        when(taskRepository.findByTaskIdAndUserId("task-x", "user-1")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> taskService.updateTaskStatus("task-x", new UpdateTaskStatusDTO(true), "user-1"))
                .isInstanceOf(TaskNotFoundException.class);

        verify(taskRepository, never()).save(any());
    }

    // --- getUserTasks ---

    @Test
    void getUserTasks_returnsAllTasksForUser() {
        List<Task> tasks = List.of(
                buildTask("task-1", "user-1", false),
                buildTask("task-2", "user-1", true)
        );
        when(taskRepository.findAllByUserId("user-1")).thenReturn(tasks);

        List<TaskResponseDTO> response = taskService.getUserTasks("user-1");

        assertThat(response).hasSize(2);
        assertThat(response).extracting(TaskResponseDTO::taskId).containsExactly("task-1", "task-2");
    }

    @Test
    void getUserTasks_returnsEmptyList_whenUserHasNoTasks() {
        when(taskRepository.findAllByUserId("user-1")).thenReturn(List.of());

        List<TaskResponseDTO> response = taskService.getUserTasks("user-1");

        assertThat(response).isEmpty();
    }

    // --- deleteTask ---

    @Test
    void deleteTask_callsDeleteById_whenTaskBelongsToUser() {
        Task existing = buildTask("task-1", "user-1", false);
        when(taskRepository.findByTaskIdAndUserId("task-1", "user-1")).thenReturn(Optional.of(existing));

        taskService.deleteTask("task-1", "user-1");

        verify(taskRepository).deleteById("task-1");
    }

    @Test
    void deleteTask_throwsTaskNotFoundException_whenTaskNotFound() {
        when(taskRepository.findByTaskIdAndUserId("task-x", "user-1")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> taskService.deleteTask("task-x", "user-1"))
                .isInstanceOf(TaskNotFoundException.class);

        verify(taskRepository, never()).deleteById(any());
    }

    // --- helper ---

    private Task buildTask(String taskId, String userId, boolean check) {
        return Task.builder()
                .taskId(taskId)
                .userId(userId)
                .description("Test task")
                .check(check)
                .createdAt(Instant.now())
                .build();
    }
}
