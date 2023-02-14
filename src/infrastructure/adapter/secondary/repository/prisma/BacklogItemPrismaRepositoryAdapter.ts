import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { BacklogItemEntity } from 'src/core/backlogItem/domain/BacklogItemEntiry';
import { BacklogItemRepositoryPort } from 'src/core/backlogItem/port/secondary/BacklogItemRepositoryPort';
import { ResultSucceeded, ResultType } from '../Result';
import { PrismaService } from './Prisma.service';

@Injectable()
export class BacklogItemPrismaRepositoryAdapter
  implements BacklogItemRepositoryPort
{
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<ResultType<BacklogItemEntity[], Error>> {
    const backlogItems = await this.prisma.backlogItem.findMany({
      include: {
        tasks: true,
      },
    });

    if (backlogItems.length === 0) {
      return new ResultSucceeded([]);
    }

    const backlogItemEntities = backlogItems.map((backlogItem) => {
      const taskEntities = backlogItem.tasks.map((task) => {
        return {
          ...task,
          deadline: DateTime.fromJSDate(task.deadline),
        };
      });

      const backlogItemEntity = BacklogItemEntity.create({
        id: backlogItem.id,
        story: backlogItem.story,
        storyPoint: backlogItem.storyPoint,
        backlogItemPriority: backlogItem.backlogItemPriority,
        description: backlogItem.description,
        tasks: taskEntities,
      }).unwrap();
      return backlogItemEntity;
    });

    return new ResultSucceeded(backlogItemEntities);
  }

  async store(
    backlogItemEntity: BacklogItemEntity,
  ): Promise<ResultType<string, Error>> {
    const backlogItem = await this.prisma.backlogItem.findUnique({
      where: {
        id: backlogItemEntity.id,
      },
    });

    if (!backlogItem) {
      const createResult = await this.prisma.backlogItem.create({
        data: {
          id: backlogItemEntity.id,
          story: backlogItemEntity.story,
          storyPoint: backlogItemEntity.storyPoint.value,
          backlogItemPriority: backlogItemEntity.backlogItemPriority.value,
          description: backlogItemEntity.description,
          tasks: {
            create: backlogItemEntity.tasks.map((task) => {
              return {
                id: task.id,
                name: task.name,
                description: task.description,
                deadline: task.deadline.toJSDate(),
                status: 1, // TODO:
                userId: task.userId,
              };
            }),
          },
        },
      });

      return new ResultSucceeded(createResult.id);
    }

    const updateResult = await this.prisma.backlogItem.update({
      where: { id: backlogItem.id },
      data: {
        story: backlogItemEntity.story,
        storyPoint: backlogItemEntity.storyPoint.value,
        backlogItemPriority: backlogItemEntity.backlogItemPriority.value,
        description: backlogItemEntity.description,
        tasks: {
          update: backlogItemEntity.tasks.map((task) => {
            return {
              where: {
                id: task.id,
              },
              data: {
                name: task.name,
                description: task.description,
                deadline: task.deadline.toJSDate(),
                status: 1, // TODO:
                userId: task.userId,
              },
            };
          }),
        },
      },
    });

    return new ResultSucceeded(updateResult.id);
  }

  //   async save(task: TaskEntity): Promise<void> {
  //     await this.prisma.task.create({
  //       data: {
  //         id: task.id,
  //         name: task.name.value,
  //         done: task.done,
  //       },
  //     });
  //   }

  //   async updateOne(task: TaskEntity): Promise<void> {
  //     await this.prisma.task.update({
  //       where: {
  //         id: task.id,
  //       },
  //       data: {
  //         id: task.id,
  //         name: task.name.value,
  //         done: task.done,
  //       },
  //     });
  //   }

  //   async deleteOne(id: number): Promise<void> {
  //     await this.prisma.task.delete({
  //       where: { id: id },
  //     });
  //   }

  //   async findOneById(id: number): Promise<TaskEntity | null> {
  //     const task = await this.prisma.task.findUnique({
  //       where: { id: id },
  //     });

  //     if (!task) {
  //       return null;
  //     }

  //     return new TaskEntity(task.id, new TaskName(task.name), task.done);
  //   }

  //   async findOneByName(taskName: TaskName): Promise<TaskEntity | null> {
  //     const task = await this.prisma.task.findUnique({
  //       where: { name: taskName.value },
  //     });

  //     if (!task) {
  //       return null;
  //     }
  //     return new TaskEntity(task.id, new TaskName(task.name), task.done);
  //   }

  //   async getNextId(): Promise<number> {
  //     const tasks = await this.prisma.task.findMany();

  //     return tasks.length + 1;
  //   }
}
