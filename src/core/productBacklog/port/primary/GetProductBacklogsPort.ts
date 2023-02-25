import { ResultType } from 'src/shared/Result';
import { ProductBacklogEntity } from '../../domain/ProductBacklogEntiry';

export abstract class GetProductBacklogsPort {
  abstract getProductBacklogs(): Promise<
    ResultType<ProductBacklogEntity[], Error>
  >;
}
