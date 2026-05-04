package com.todo.app.infraestructure.persistence.repository;

import com.todo.app.infraestructure.persistence.entity.TaskDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface TaskMongoRepository extends MongoRepository<TaskDocument, String> {

    @Query("{'_id': ?0, 'userId': ?1}")
    Optional<TaskDocument> findByIdAndUserId(String id, String userId);
}
