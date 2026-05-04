package com.todo.app.domain.service;

import com.todo.app.application.dto.request.LoginUserDTO;
import com.todo.app.application.dto.request.RegisterUserDTO;
import com.todo.app.application.dto.response.RegisterUserResponseDTO;
import com.todo.app.domain.exception.EmailAlreadyExistsException;
import com.todo.app.domain.exception.InvalidCredentialsException;
import com.todo.app.domain.model.User;
import com.todo.app.domain.port.out.PasswordHasher;
import com.todo.app.domain.port.out.TokenGenerator;
import com.todo.app.domain.port.out.UserRepository;

import java.util.Optional;
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

    @Test
    void loginUser_returnsTokenAndUserData_whenCredentialsAreValid() {
        LoginUserDTO dto = new LoginUserDTO("john@example.com", "secret123");
        User storedUser = User.builder()
                .userId("user-id-1")
                .name("John Doe")
                .email("john@example.com")
                .password("hashed")
                .build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(storedUser));
        when(passwordHasher.matches("secret123", "hashed")).thenReturn(true);
        when(tokenGenerator.generateToken(storedUser)).thenReturn("jwt-token");

        RegisterUserResponseDTO response = userService.loginUser(dto);

        assertThat(response.token()).isEqualTo("jwt-token");
        assertThat(response.name()).isEqualTo("John Doe");
        assertThat(response.userId()).isEqualTo("user-id-1");
    }

    @Test
    void loginUser_throwsInvalidCredentialsException_whenEmailNotFound() {
        LoginUserDTO dto = new LoginUserDTO("unknown@example.com", "secret123");

        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.loginUser(dto))
                .isInstanceOf(InvalidCredentialsException.class);

        verify(passwordHasher, never()).matches(any(), any());
        verify(tokenGenerator, never()).generateToken(any());
    }

    @Test
    void loginUser_throwsInvalidCredentialsException_whenPasswordIsWrong() {
        LoginUserDTO dto = new LoginUserDTO("john@example.com", "wrong-password");
        User storedUser = User.builder()
                .userId("user-id-1")
                .name("John Doe")
                .email("john@example.com")
                .password("hashed")
                .build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(storedUser));
        when(passwordHasher.matches("wrong-password", "hashed")).thenReturn(false);

        assertThatThrownBy(() -> userService.loginUser(dto))
                .isInstanceOf(InvalidCredentialsException.class);

        verify(tokenGenerator, never()).generateToken(any());
    }
}
