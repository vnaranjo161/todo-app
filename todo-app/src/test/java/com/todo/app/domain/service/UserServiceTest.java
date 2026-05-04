package com.todo.app.domain.service;

import com.todo.app.application.dto.request.RegisterUserDTO;
import com.todo.app.application.dto.response.RegisterUserResponseDTO;
import com.todo.app.domain.exception.EmailAlreadyExistsException;
import com.todo.app.domain.model.User;
import com.todo.app.domain.port.out.PasswordHasher;
import com.todo.app.domain.port.out.TokenGenerator;
import com.todo.app.domain.port.out.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordHasher passwordHasher;

    @Mock
    private TokenGenerator tokenGenerator;

    @InjectMocks
    private UserService userService;

    @Test
    void registerUser_returnsTokenAndUserData_whenEmailIsNew() {
        RegisterUserDTO dto = new RegisterUserDTO("John Doe", "john@example.com", "secret123");

        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        when(passwordHasher.hash("secret123")).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(tokenGenerator.generateToken(any(User.class))).thenReturn("jwt-token");

        RegisterUserResponseDTO response = userService.registerUser(dto);

        assertThat(response.token()).isEqualTo("jwt-token");
        assertThat(response.name()).isEqualTo("John Doe");
        assertThat(response.userId()).isNotBlank();
    }

    @Test
    void registerUser_throwsEmailAlreadyExistsException_whenEmailIsTaken() {
        RegisterUserDTO dto = new RegisterUserDTO("John Doe", "john@example.com", "secret123");

        when(userRepository.existsByEmail("john@example.com")).thenReturn(true);

        assertThatThrownBy(() -> userService.registerUser(dto))
                .isInstanceOf(EmailAlreadyExistsException.class)
                .hasMessageContaining("john@example.com");

        verify(userRepository, never()).save(any());
    }

    @Test
    void registerUser_savesHashedPassword_neverPlainText() {
        RegisterUserDTO dto = new RegisterUserDTO("John Doe", "john@example.com", "plaintext");

        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(passwordHasher.hash("plaintext")).thenReturn("bcrypt-hash");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(tokenGenerator.generateToken(any(User.class))).thenReturn("token");

        userService.registerUser(dto);

        verify(userRepository).save(argThat(user ->
                "bcrypt-hash".equals(user.getPassword()) && !"plaintext".equals(user.getPassword())
        ));
    }
}
