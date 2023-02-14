import { ResultType } from 'src/infrastructure/adapter/secondary/repository/Result';
import { BacklogItemEntity } from '../../domain/BacklogItemEntiry';

export abstract class GetBacklogItemsUseCasePort {
  abstract execute(): Promise<ResultType<BacklogItemEntity[], Error>>;
}
