package com.todo.app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = "JWT_SECRET=test-secret-key-for-testing-only")
class TodoAppApplicationTests {

	@Test
	void contextLoads() {
	}

}
