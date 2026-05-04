package com.todo.app.infraestructure.rest;

import com.todo.app.application.dto.request.LoginUserDTO;
import com.todo.app.application.dto.request.RegisterUserDTO;
import com.todo.app.application.dto.response.RegisterUserResponseDTO;
import com.todo.app.domain.port.in.LoginUserUseCase;
import com.todo.app.domain.port.in.RegisterUserUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUserUseCase loginUserUseCase;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDTO> register(@Valid @RequestBody RegisterUserDTO dto) {
        RegisterUserResponseDTO response = registerUserUseCase.registerUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<RegisterUserResponseDTO> login(@Valid @RequestBody LoginUserDTO dto) {
        RegisterUserResponseDTO response = loginUserUseCase.loginUser(dto);
        return ResponseEntity.ok(response);
    }
}
