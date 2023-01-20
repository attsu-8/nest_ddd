import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/core/domain/task/TaskEntity';
import { TaskName } from 'src/core/domain/task/valueObject/TaskName';
import { NewTaskCreatorPort } from 'src/core/port/secondary/task/factory/NewTaskCreatorPort';
import { TaskRepositoryPort } from 'src/core/port/secondary/task/repository/TaskRepositoryPort';

@Injectable()
export class NewTaskCreatorAdapter implements NewTaskCreatorPort {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async handle(taskName: TaskName): Promise<TaskEntity> {
    const id = await this.taskRepository.getNextId();
    return new TaskEntity(id, taskName);
  }
}
