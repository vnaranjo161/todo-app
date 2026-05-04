package com.todo.app.domain.exception;

public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException(String correo) {
        super("El email ya está registrado: " + correo);
    }
}
