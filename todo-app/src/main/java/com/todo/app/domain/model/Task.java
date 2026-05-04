package com.todo.app.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class Task {

    private String taskId;
    private String userId;
    private String description;
    private boolean check;
    private Instant createdAt;
}
