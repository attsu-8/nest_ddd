import { ResultType } from 'src/shared/Result';
import { ProductBacklogEntity } from '../../domain/ProductBacklogEntiry';

export abstract class ProductBacklogRepositoryPort {
  abstract findAll(): Promise<ResultType<ProductBacklogEntity[], Error>>;

  abstract findOneById(
    id: string,
  ): Promise<ResultType<ProductBacklogEntity, Error>>;

  abstract store(
    productBacklogEntity: ProductBacklogEntity,
  ): Promise<ResultType<string, Error>>;

  abstract delete(id: string): Promise<ResultType<string, Error>>;
}
