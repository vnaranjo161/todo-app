package com.todo.app.domain.service;

import com.todo.app.application.dto.request.RegisterUserDTO;
import com.todo.app.application.dto.response.RegisterUserResponseDTO;
import com.todo.app.application.usecases.RegisterUserUseCase;
import com.todo.app.domain.exception.EmailAlreadyExistsException;
import com.todo.app.domain.model.User;
import com.todo.app.domain.port.out.PasswordHasher;
import com.todo.app.domain.port.out.TokenGenerator;
import com.todo.app.domain.port.out.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements RegisterUserUseCase {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;
    private final TokenGenerator tokenGenerator;

    @Override
    public RegisterUserResponseDTO registerUser(RegisterUserDTO registerUserDTO) {

        if (userRepository.existsByEmail(registerUserDTO.email())) {
            throw new EmailAlreadyExistsException(registerUserDTO.email());
        }

        User usuario = User.builder()
                .userId(UUID.randomUUID().toString())
                .name(registerUserDTO.name())
                .email(registerUserDTO.email())
                .password(passwordHasher.hash(registerUserDTO.password()))
                .build();

        User saved = userRepository.save(usuario);
        String token = tokenGenerator.generateToken(saved);
        return new RegisterUserResponseDTO(token, saved.getName(), saved.getUserId());
    }
}
