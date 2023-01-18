import { Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from 'src/core/port/secondary/task/repository/TaskRepositoryPort';
import { TaskEntity } from '../TaskEntity';

@Injectable()
export class DuplicateTaskChecker {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async handle(task: TaskEntity): Promise<boolean> {
    const foundedTask = await this.taskRepository.findOneByName(task.name);
    return !!foundedTask;
  }
}
