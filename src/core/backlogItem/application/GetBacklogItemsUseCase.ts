import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { BacklogItemEntity } from '../domain/BacklogItemEntiry';
import { GetBacklogItemsUseCasePort } from '../port/primary/GetBacklogItemsUseCasePort';
import { BacklogItemRepositoryPort } from '../port/secondary/BacklogItemRepositoryPort';

@Injectable()
export class GetBacklogItemsUseCase implements GetBacklogItemsUseCasePort {
  constructor(
    private readonly backlogItemRepository: BacklogItemRepositoryPort,
  ) {}

  async execute(): Promise<ResultType<BacklogItemEntity[], Error>> {
    const backlogItemEntities = await this.backlogItemRepository.findAll();

    if (backlogItemEntities.resultType === RESULT_TYPE.FAILED) {
      return backlogItemEntities;
    }

    return backlogItemEntities;
  }
}
