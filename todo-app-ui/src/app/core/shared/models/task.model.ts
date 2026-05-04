export interface Task {
  taskId: string;
  description: string;
  check: boolean;
}

export interface CreateTaskRequest {
  description: string;
}
