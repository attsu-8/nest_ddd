import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { BacklogItemEntity } from 'src/core/backlogItem/domain/BacklogItemEntiry';
import { BacklogItemRepositoryPort } from 'src/core/backlogItem/port/secondary/BacklogItemRepositoryPort';
import {
  ResultFailed,
  ResultSucceeded,
  ResultType,
} from '../../../../../../../shared/Result';
import { PrismaService } from '../../Prisma.service';

@Injectable()
export class BacklogItemPrismaRepositoryAdapter
  implements BacklogItemRepositoryPort
{
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<ResultType<BacklogItemEntity[], Error>> {
    const backlogItems = await this.prisma.backlogItem.findMany({
      include: {
        tasks: true,
        productBacklog: true,
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
        productBacklogId: backlogItem.productBacklogId,
        tasks: taskEntities,
        description: backlogItem.description,
      }).unwrap();
      return backlogItemEntity;
    });

    return new ResultSucceeded(backlogItemEntities);
  }

  async findByProductBacklogId(
    productBacklogId: string,
  ): Promise<ResultType<BacklogItemEntity[], Error>> {
    const backlogItems = await this.prisma.backlogItem.findMany({
      include: {
        tasks: true,
        productBacklog: true,
      },
      where: {
        productBacklogId: productBacklogId,
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
        productBacklogId: backlogItem.productBacklogId,
        tasks: taskEntities,
        description: backlogItem.description,
      }).unwrap();
      return backlogItemEntity;
    });

    return new ResultSucceeded(backlogItemEntities);
  }

  async findOneById(id: string): Promise<ResultType<BacklogItemEntity, Error>> {
    const backlogItem = await this.prisma.backlogItem.findUnique({
      where: { id: id },
      include: {
        tasks: true,
        productBacklog: true,
      },
    });
    if (!backlogItem) {
      return new ResultFailed(Error('not found'));
    }

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
      productBacklogId: backlogItem.productBacklogId,
      tasks: taskEntities,
      description: backlogItem.description,
    }).unwrap();

    return new ResultSucceeded(backlogItemEntity);
  }

  async store(
    backlogItemEntity: BacklogItemEntity,
  ): Promise<ResultType<string, Error>> {
    const backlogItem = await this.prisma.backlogItem.findUnique({
      where: {
        id: backlogItemEntity.id,
      },
      include: {
        tasks: true,
        productBacklog: true,
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
          productBacklog: {
            connect: {
              id: backlogItemEntity.productBacklogId,
            },
          },
          tasks: {
            create: backlogItemEntity.tasks.map((task) => {
              return {
                id: task.id,
                name: task.name,
                description: task.description,
                deadline: task.deadline.toJSDate(),
                status: task.status as number,
                userId: task.userId,
              };
            }),
          },
        },
      });

      return new ResultSucceeded(createResult.id);
    }

    const updateTaskIdSets = new Set(
      backlogItemEntity.tasks.map((task) => task.id),
    );

    const oldTaskIdSets = new Set(backlogItem.tasks.map((task) => task.id));

    const deleteIds = new Set(
      [...oldTaskIdSets].filter((x) => !updateTaskIdSets.has(x)),
    );

    await this.prisma.task.deleteMany({
      where: {
        id: {
          in: Array.from(deleteIds),
        },
      },
    });

    const updateResult = await this.prisma.backlogItem.upsert({
      where: { id: backlogItem.id },
      update: {
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
                status: task.status as number,
                userId: task.userId,
              },
            };
          }),
        },
      },
      create: {
        id: backlogItemEntity.id,
        story: backlogItemEntity.story,
        storyPoint: backlogItemEntity.storyPoint.value,
        backlogItemPriority: backlogItemEntity.backlogItemPriority.value,
        description: backlogItemEntity.description,
        productBacklogId: backlogItemEntity.productBacklogId,
        tasks: {
          createMany: {
            data: backlogItemEntity.tasks.map((task) => {
              return {
                id: task.id,
                name: task.name,
                description: task.description,
                deadline: task.deadline.toJSDate(),
                status: task.status as number,
                userId: task.userId,
              };
            }),
          },
        },
      },
    });

    return new ResultSucceeded(updateResult.id);
  }

  async delete(id: string): Promise<ResultType<string, Error>> {
    const deleteResult = await this.prisma.backlogItem.delete({
      where: { id: id },
    });

    return new ResultSucceeded(deleteResult.id);
  }
}
