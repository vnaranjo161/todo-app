package com.todo.app.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginUserDTO(

        @Email(message = "El correo electrónico proporcionado no es válido")
        @NotBlank(message = "El correo electrónico es requerido")
        String email,

        @NotBlank(message = "La contraseña es requerida")
        String password
) {
}
