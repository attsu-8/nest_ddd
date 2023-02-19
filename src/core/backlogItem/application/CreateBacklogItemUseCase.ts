import { Injectable } from '@nestjs/common';
import {
  ResultFailed,
  ResultSucceeded,
  ResultType,
  RESULT_TYPE,
} from 'src/shared/Result';
import { BacklogItemEntity } from '../domain/BacklogItemEntiry';
import {
  CreateBacklogItemCommand,
  CreateBacklogItemUseCasePort,
} from '../port/primary/CreateBacklogItemUseCasePort';
import { BacklogItemRepositoryPort } from '../port/secondary/BacklogItemRepositoryPort';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateBacklogItemUseCase implements CreateBacklogItemUseCasePort {
  constructor(
    private readonly backlogItemRepository: BacklogItemRepositoryPort,
  ) {}
  async execute(
    createBacklogItemCommand: CreateBacklogItemCommand,
  ): Promise<ResultType<string, Error>> {
    const backlogItemId = uuidv4();

    const tasks = createBacklogItemCommand.tasks.map((task) => {
      return {
        id: uuidv4(),
        ...task,
      };
    });

    const backlogItemEntity = BacklogItemEntity.create({
      id: backlogItemId,
      story: createBacklogItemCommand.story,
      storyPoint: createBacklogItemCommand.storyPoint,
      backlogItemPriority: createBacklogItemCommand.backlogItemPriority,
      description: createBacklogItemCommand.description,
      tasks: tasks,
    });
    if (backlogItemEntity.resultType === RESULT_TYPE.FAILED) {
      return new ResultFailed(backlogItemEntity.error);
    }

    const storeResult = await this.backlogItemRepository.store(
      backlogItemEntity.value,
    );
    if (storeResult.resultType === RESULT_TYPE.FAILED) {
      return new ResultFailed(storeResult.error);
    }

    return new ResultSucceeded(storeResult.value);
  }
}
