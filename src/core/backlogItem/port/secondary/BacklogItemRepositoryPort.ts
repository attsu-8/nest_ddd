import { ResultType } from 'src/shared/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';

export abstract class BacklogItemRepositoryPort {
  abstract findAll(): Promise<ResultType<BacklogItemEntity[], Error>>;

  abstract findByProductBacklogId(
    productBacklogId: string,
  ): Promise<ResultType<BacklogItemEntity[], Error>>;

  abstract findOneById(
    id: string,
  ): Promise<ResultType<BacklogItemEntity, Error>>;

  abstract store(
    backlogItemEntity: BacklogItemEntity,
  ): Promise<ResultType<string, Error>>;

  abstract delete(id: string): Promise<ResultType<string, Error>>;
}
