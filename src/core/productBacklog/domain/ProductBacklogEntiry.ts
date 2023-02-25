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

  update(updateParams: {
    name?: string;
    productOwnerId?: string;
    description?: string;
  }): ResultType<ProductBacklogEntity, Error> {
    return ProductBacklogEntity.create({
      id: this.id,
      name: updateParams.name ?? this.name,
      productOwnerId: updateParams.productOwnerId ?? this.productOwnerId,
      description: updateParams.description ?? this.description,
    });
  }

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
