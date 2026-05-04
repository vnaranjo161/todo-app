package com.todo.app.domain.port.in;

import com.todo.app.application.dto.request.RegisterUserDTO;
import com.todo.app.application.dto.response.RegisterUserResponseDTO;

public interface RegisterUserUseCase {

    RegisterUserResponseDTO registerUser(RegisterUserDTO registerUserDTO);
}
