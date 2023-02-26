import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { BacklogItemRepositoryPort } from '../../port/secondary/BacklogItemRepositoryPort';
import {
  DeleteBacklogItemPort,
  DeleteBacklogItemRequest,
} from '../../port/primary/DeleteBacklogItemPort';

@Injectable()
export class DeleteBacklogItemUseCase implements DeleteBacklogItemPort {
  constructor(
    private readonly backlogItemRepository: BacklogItemRepositoryPort,
  ) {}
  async deleteBacklogItem(
    deleteBacklogItemRequest: DeleteBacklogItemRequest,
  ): Promise<ResultType<string, Error>> {
    const deleteResult = await this.backlogItemRepository.delete(
      deleteBacklogItemRequest.id,
    );
    if (deleteResult.resultType === RESULT_TYPE.FAILED) {
      return deleteResult;
    }

    return deleteResult;
  }
}
