import { ResultType } from 'src/shared/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';

export abstract class GetBacklogItemsPort {
  abstract getBacklogItems(): Promise<ResultType<BacklogItemEntity[], Error>>;
}
