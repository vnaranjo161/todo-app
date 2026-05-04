package com.todo.app.infraestructure.persistence.repository;

import com.todo.app.infraestructure.persistence.entity.TaskDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskMongoRepository extends MongoRepository<TaskDocument, String> {
}
