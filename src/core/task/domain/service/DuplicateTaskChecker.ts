import { Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from '../../port/secondary/repository/TaskRepositoryPort';
import { TaskEntity } from '../TaskEntity';

@Injectable()
export class DuplicateTaskChecker {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async handle(task: TaskEntity): Promise<boolean> {
    const foundedTask = await this.taskRepository.findOneByName(task.name);
    return !!foundedTask;
  }
}