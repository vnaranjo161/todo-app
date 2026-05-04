package com.todo.app.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterUserDTO(

        @NotBlank(message = "El nombre del usuario es requerido")
        String name,

        @Email(message = "El email electrónico proporcionado no es válido")
        @NotBlank(message = "El email electrónico del usuario es requerido")
        String email,

        @NotBlank(message = "La contraseña es requerida")
        String password
) {
}
