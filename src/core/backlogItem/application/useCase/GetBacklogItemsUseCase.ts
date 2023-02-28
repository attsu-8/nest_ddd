import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';
import { GetBacklogItemsPort } from '../../port/primary/GetBacklogItemsPort';
import { BacklogItemRepositoryPort } from '../../port/secondary/BacklogItemRepositoryPort';

@Injectable()
export class GetBacklogItemsUseCase implements GetBacklogItemsPort {
  constructor(
    private readonly backlogItemRepository: BacklogItemRepositoryPort,
  ) {}

  async getBacklogItems(): Promise<ResultType<BacklogItemEntity[], Error>> {
    const backlogItemEntities = await this.backlogItemRepository.findAll();
    if (backlogItemEntities.resultType === RESULT_TYPE.FAILED) {
      return backlogItemEntities;
    }

    return backlogItemEntities;
  }

  async findByProductBacklogId(
    productBacklogId: string,
  ): Promise<ResultType<BacklogItemEntity[], Error>> {
    const backlogItemEntities =
      await this.backlogItemRepository.findByProductBacklogId(productBacklogId);
    return backlogItemEntities;
  }
}
