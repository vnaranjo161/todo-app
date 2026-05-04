package com.todo.app.application.usecases;

import com.todo.app.application.dto.request.RegisterUserDTO;
import com.todo.app.application.dto.response.RegisterUserResponseDTO;

public interface RegisterUserUseCase {

    RegisterUserResponseDTO registerUser(RegisterUserDTO registerUserDTO);
}
