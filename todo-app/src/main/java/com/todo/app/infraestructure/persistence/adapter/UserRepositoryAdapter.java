package com.todo.app.infraestructure.persistence.adapter;

import com.todo.app.domain.model.User;
import com.todo.app.domain.port.out.UserRepository;
import com.todo.app.infraestructure.persistence.entity.UserDocument;
import com.todo.app.infraestructure.persistence.repository.UserMongoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserRepositoryAdapter implements UserRepository {

    private final UserMongoRepository mongoRepository;

    @Override
    public User save(User usuario) {
        UserDocument document = UserDocument.builder()
                .id(usuario.getUserId())
                .name(usuario.getName())
                .email(usuario.getEmail())
                .password(usuario.getPassword())
                .build();

        UserDocument saved = mongoRepository.save(document);

        return User.builder()
                .userId(saved.getId())
                .name(saved.getName())
                .email(saved.getEmail())
                .password(saved.getPassword())
                .build();
    }

    @Override
    public Optional<User> findByEmail(String correo) {
        return mongoRepository.findByEmail(correo)
                .map(doc -> User.builder()
                        .userId(doc.getId())
                        .name(doc.getName())
                        .email(doc.getEmail())
                        .password(doc.getPassword())
                        .build());
    }

    @Override
    public boolean existsByEmail(String correo) {
        return mongoRepository.existsByEmail(correo);
    }
}
