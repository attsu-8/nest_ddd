import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/core/domain/task/TaskEntity';
import { TaskName } from 'src/core/domain/task/valueObject/TaskName';
import { TaskRepositoryPort } from 'src/core/port/secondary/repository/TaskRepositoryPort';

@Injectable()
export class TaskInMemoryRepositoryAdapter implements TaskRepositoryPort {
  // Mock.
  private tasks = [
    {
      id: 1,
      name: 'Install mysql.',
      done: true,
    },
    {
      id: 2,
      name: 'Create database.',
      done: false,
    },
  ];

  async getAll(): Promise<TaskEntity[]> {
    return this.tasks.map(
      (taskData) =>
        new TaskEntity(taskData.id, new TaskName(taskData.name), taskData.done),
    );
  }

  async save(task: TaskEntity): Promise<void> {
    this.tasks.push({
      id: task.id,
      name: task.name.value,
      done: task.done,
    });
  }

  async updateOne(task: TaskEntity): Promise<void> {
    this.tasks = this.tasks.map((_task) => {
      if (_task.id === task.id) {
        return { id: task.id, name: task.name.value, done: task.done };
      }

      return _task;
    });
  }

  async deleteOne(id: number): Promise<void> {
    this.tasks = this.tasks
      .map((_task) => {
        if (_task.id !== id) {
          return _task;
        }
      })
      .filter(Boolean);
  }

  async findOneById(id: number): Promise<TaskEntity | null> {
    const taskData = this.tasks.find((_task) => {
      return _task.id === id;
    });

    if (taskData) {
      return new TaskEntity(
        taskData.id,
        new TaskName(taskData.name),
        taskData.done,
      );
    } else {
      return null;
    }
  }

  async findOneByName(taskName: TaskName): Promise<TaskEntity | null> {
    const taskData = this.tasks.find((_task) => {
      return _task.name === taskName.value;
    });

    if (taskData) {
      return new TaskEntity(
        taskData.id,
        new TaskName(taskData.name),
        taskData.done,
      );
    } else {
      return null;
    }
  }

  async getNextId(): Promise<number> {
    return this.tasks.length + 1;
  }
}
