package com.todo.app.domain.port.in;

import com.todo.app.application.dto.request.LoginUserDTO;
import com.todo.app.application.dto.response.RegisterUserResponseDTO;

public interface LoginUserUseCase {

    RegisterUserResponseDTO loginUser(LoginUserDTO loginUserDTO);
}
