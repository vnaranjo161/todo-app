package com.todo.app.domain.port.out;

public interface PasswordHasher {

    String hash(String password);
    boolean matches(String password, String hashedPassword);

}
