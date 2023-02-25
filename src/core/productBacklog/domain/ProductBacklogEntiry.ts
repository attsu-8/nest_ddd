import { ResultSucceeded, ResultType } from 'src/shared/Result';

interface ProductBacklogEntiryFactoryParams {
  id: string;
  name: string;
  productOwnerId: string;
  description?: string;
}

export class ProductBacklogEntity {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly productOwnerId: string,
    public readonly description?: string,
  ) {}

  static create(
    params: ProductBacklogEntiryFactoryParams,
  ): ResultType<ProductBacklogEntity, Error> {
    return new ResultSucceeded(
      new ProductBacklogEntity(
        params.id,
        params.name,
        params.productOwnerId,
        params.description,
      ),
    );
  }
}
