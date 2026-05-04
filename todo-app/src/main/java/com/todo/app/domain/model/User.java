package com.todo.app.domain.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class User {

    private String userId;
    private String name;
    private String email;
    private String password;

}
