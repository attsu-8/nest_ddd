import { ResultType } from 'src/shared/Result';
import { ProductBacklogEntity } from '../../domain/ProductEntiry';

export abstract class ProductBacklogRepositoryPort {
  abstract findAll(): Promise<ResultType<ProductBacklogEntity[], Error>>;

  abstract store(
    productBacklogEntity: ProductBacklogEntity,
  ): Promise<ResultType<string, Error>>;
}
