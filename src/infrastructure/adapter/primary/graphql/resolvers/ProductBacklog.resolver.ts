import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductBacklogPort } from 'src/core/product/port/primary/CreateProductBacklogPort';
import { GetProductBacklogsPort } from 'src/core/product/port/primary/GetProductBacklogsUseCasePort';
import { RESULT_TYPE } from 'src/shared/Result';
import { ProductBacklog } from '../models/ProductBacklog.model';

@Resolver()
export class ProductBacklogResolver {
  constructor(
    private getProductBacklogsPort: GetProductBacklogsPort,
    private createProductBacklogPort: CreateProductBacklogPort,
  ) {}

  @Query(() => [ProductBacklog])
  async getAllProductBacklogs(): Promise<ProductBacklog[]> {
    const productBacklogs =
      await this.getProductBacklogsPort.getProductBacklogs();
    if (productBacklogs.resultType === RESULT_TYPE.FAILED) {
      // TODO:
      return [];
    }
    return productBacklogs.value.map((productBacklog) => {
      return {
        id: productBacklog.id,
        name: productBacklog.name,
        productOwnerId: productBacklog.productOwnerId,
        description: productBacklog.description,
      };
    });
  }

  @Mutation(() => String)
  async createProductBacklog(
    @Args({ name: 'name', type: () => String })
    name: string,
    @Args({ name: 'productOwnerId', type: () => String })
    productOwnerId: string,
    @Args({ name: 'description', type: () => String, nullable: true })
    description?: string,
  ): Promise<string> {
    const createResult =
      await this.createProductBacklogPort.createProductBacklog({
        name: name,
        productOwnerId: productOwnerId,
        description: description,
      });
    if (createResult.resultType === RESULT_TYPE.FAILED) {
      return 'todo';
    }

    return createResult.value;
  }
}
