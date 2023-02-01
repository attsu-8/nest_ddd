import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/core/task/domain/TaskEntity';
import { TaskName } from 'src/core/task/domain/valueObject/TaskName';
import { NewTaskCreatorPort } from 'src/core/task/port/secondary/factory/NewTaskCreatorPort';
import { TaskRepositoryPort } from 'src/core/task/port/secondary/repository/TaskRepositoryPort';

@Injectable()
export class NewTaskCreatorAdapter implements NewTaskCreatorPort {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async handle(taskName: TaskName): Promise<TaskEntity> {
    const id = await this.taskRepository.getNextId();
    return new TaskEntity(id, taskName);
  }
}
