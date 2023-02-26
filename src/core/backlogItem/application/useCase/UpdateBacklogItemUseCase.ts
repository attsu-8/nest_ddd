import { Injectable } from '@nestjs/common';
import {
  ResultFailed,
  ResultSucceeded,
  ResultType,
  RESULT_TYPE,
} from 'src/shared/Result';
import { BacklogItemRepositoryPort } from '../../port/secondary/BacklogItemRepositoryPort';
import {
  UpdateBacklogItemPort,
  UpdateBacklogItemRequest,
} from '../../port/primary/UpdateBacklogItemPort';

@Injectable()
export class UpdateBacklogItemUseCase implements UpdateBacklogItemPort {
  constructor(
    private readonly backlogItemRepository: BacklogItemRepositoryPort,
  ) {}
  async updateBacklogItem(
    updateBacklogItemRequest: UpdateBacklogItemRequest,
  ): Promise<ResultType<string, Error>> {
    if (
      !updateBacklogItemRequest.story &&
      !updateBacklogItemRequest.storyPoint &&
      !updateBacklogItemRequest.backlogItemPriority &&
      !updateBacklogItemRequest.productBacklogId &&
      !updateBacklogItemRequest.tasks &&
      !updateBacklogItemRequest.description
    ) {
      return new ResultSucceeded(updateBacklogItemRequest.id);
    }
    const backlogItemEntity = await this.backlogItemRepository.findOneById(
      updateBacklogItemRequest.id,
    );
    if (backlogItemEntity.resultType === RESULT_TYPE.FAILED) {
      return backlogItemEntity;
    }

    const updateResult = backlogItemEntity.value.update(
      updateBacklogItemRequest,
    );
    if (updateResult.resultType === RESULT_TYPE.FAILED) {
      return updateResult;
    }

    const storeResult = await this.backlogItemRepository.store(
      updateResult.value,
    );
    if (storeResult.resultType === RESULT_TYPE.FAILED) {
      return new ResultFailed(storeResult.error);
    }

    return new ResultSucceeded(storeResult.value);
  }
}
