import { ResultType } from 'src/shared/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';

export abstract class BacklogItemRepositoryPort {
  abstract findAll(): Promise<ResultType<BacklogItemEntity[], Error>>;

  abstract store(
    backlogItemEntity: BacklogItemEntity,
  ): Promise<ResultType<string, Error>>;
}
