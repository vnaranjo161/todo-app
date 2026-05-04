package com.todo.app.application.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CreateTaskDTO(

        @NotBlank(message = "La descripción de la tarea es requerida")
        String description
) {
}
