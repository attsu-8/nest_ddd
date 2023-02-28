import { ResultType } from 'src/shared/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';

export abstract class GetBacklogItemsPort {
  abstract getBacklogItems(): Promise<ResultType<BacklogItemEntity[], Error>>;

  abstract findByProductBacklogId(
    productBacklogId: string,
  ): Promise<ResultType<BacklogItemEntity[], Error>>;
}
