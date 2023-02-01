import { HttpStatus } from '@nestjs/common';
import { TaskEntity } from 'src/core/task/domain/TaskEntity';

export class GetAllTasksResponseDto {
  // The property name 'statusCode' is derived from nestjs exception.
  statusCode = HttpStatus.OK;
  tasks: { id: number; name: string; done: boolean }[];

  constructor(_tasks: TaskEntity[]) {
    this.tasks = _tasks.map((task) => {
      return { id: task.id, name: task.name.value, done: task.done };
    });
  }
}

export interface CreateTaskRequestDto {
  name: string;
}

export interface CreateTaskResponseDto {
  statusCode: HttpStatus;
}

export interface UpdateTaskRequestDto {
  name: string;
  done: boolean;
}

export interface UpdateTaskResponseDto {
  statusCode: HttpStatus;
}

export interface DeleteTaskResponseDto {
  statusCode: HttpStatus;
}
