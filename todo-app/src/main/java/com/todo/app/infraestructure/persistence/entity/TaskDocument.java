package com.todo.app.infraestructure.persistence.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "tasks")
public class TaskDocument {

    @Id
    private String id;

    @Indexed
    private String userId;
    private String description;
    private boolean check;
}
