import { ResultType } from 'src/infrastructure/adapter/secondary/repository/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';

export abstract class BacklogItemRepositoryPort {
  abstract store(
    backlogItemEntity: BacklogItemEntity,
  ): Promise<ResultType<number, Error>>;
}
