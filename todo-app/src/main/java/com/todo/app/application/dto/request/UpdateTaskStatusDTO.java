package com.todo.app.application.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateTaskStatusDTO(

        @NotNull(message = "El estado de la tarea es requerido")
        Boolean check
) {
}
