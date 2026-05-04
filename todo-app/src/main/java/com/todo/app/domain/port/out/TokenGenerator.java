package com.todo.app.domain.port.out;

import com.todo.app.domain.model.User;

public interface TokenGenerator {

    String generateToken(User user);
}
