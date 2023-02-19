import { ResultType } from 'src/shared/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';

export abstract class GetBacklogItemsUseCasePort {
  abstract execute(): Promise<ResultType<BacklogItemEntity[], Error>>;
}
