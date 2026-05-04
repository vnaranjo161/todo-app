package com.todo.app.infraestructure.persistence.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "users")
public class UserDocument {

    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;
}
