package com.todo.app.domain.port.out;

import com.todo.app.domain.model.User;

import java.util.Optional;

public interface UserRepository {

    User save(User usuario);
    Optional<User> findByEmail(String correo);
    boolean existsByEmail(String correo);
}
