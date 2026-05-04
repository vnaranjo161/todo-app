package com.todo.app.infraestructure.persistence.repository;

import com.todo.app.infraestructure.persistence.entity.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserMongoRepository extends MongoRepository<UserDocument, String> {

    Optional<UserDocument> findByEmail(String email);
    boolean existsByEmail(String email);
}
