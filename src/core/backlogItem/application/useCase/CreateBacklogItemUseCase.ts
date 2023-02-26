import { Injectable } from '@nestjs/common';
import {
  ResultFailed,
  ResultSucceeded,
  ResultType,
  RESULT_TYPE,
} from 'src/shared/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';
import { BacklogItemRepositoryPort } from '../../port/secondary/BacklogItemRepositoryPort';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateBacklogItemPort,
  CreateBacklogItemRequest,
} from '../../port/primary/CreateBacklogItemPort';

@Injectable()
export class CreateBacklogItemUseCase implements CreateBacklogItemPort {
  constructor(
    private readonly backlogItemRepository: BacklogItemRepositoryPort,
  ) {}
  async createBacklogItem(
    createBacklogItemRequest: CreateBacklogItemRequest,
  ): Promise<ResultType<string, Error>> {
    const backlogItemId = uuidv4();

    const tasks = createBacklogItemRequest.tasks.map((task) => {
      return {
        id: uuidv4(),
        ...task,
      };
    });

    const backlogItemEntity = BacklogItemEntity.create({
      id: backlogItemId,
      story: createBacklogItemRequest.story,
      storyPoint: createBacklogItemRequest.storyPoint,
      backlogItemPriority: createBacklogItemRequest.backlogItemPriority,
      productBacklogId: createBacklogItemRequest.productBacklogId,
      tasks: tasks,
      description: createBacklogItemRequest.description,
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
