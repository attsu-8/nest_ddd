import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/core/task/domain/TaskEntity';
import { TaskName } from 'src/core/task/domain/valueObject/TaskName';
import { TaskRepositoryPort } from 'src/core/task/port/secondary/repository/TaskRepositoryPort';
import { PrismaService } from './Prisma.service';

@Injectable()
export class TaskPrismaRepositoryAdapter implements TaskRepositoryPort {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<TaskEntity[]> {
    const tasks = await this.prisma.task.findMany();

    const taskEntities = tasks.map((task) => {
      return new TaskEntity(task.id, new TaskName(task.name), task.done);
    });

    return taskEntities;
  }

  async save(task: TaskEntity): Promise<void> {
    await this.prisma.task.create({
      data: {
        id: task.id,
        name: task.name.value,
        done: task.done,
      },
    });
  }

  async updateOne(task: TaskEntity): Promise<void> {
    await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        id: task.id,
        name: task.name.value,
        done: task.done,
      },
    });
  }

  async deleteOne(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id: id },
    });
  }

  async findOneById(id: number): Promise<TaskEntity | null> {
    const task = await this.prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      return null;
    }

    return new TaskEntity(task.id, new TaskName(task.name), task.done);
  }

  async findOneByName(taskName: TaskName): Promise<TaskEntity | null> {
    const task = await this.prisma.task.findUnique({
      where: { name: taskName.value },
    });

    if (!task) {
      return null;
    }
    return new TaskEntity(task.id, new TaskName(task.name), task.done);
  }

  async getNextId(): Promise<number> {
    const tasks = await this.prisma.task.findMany();

    return tasks.length + 1;
  }
}
