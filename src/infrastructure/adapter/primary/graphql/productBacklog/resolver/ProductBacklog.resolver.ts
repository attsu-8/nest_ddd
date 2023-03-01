import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductBacklogPort } from 'src/core/productBacklog/port/primary/CreateProductBacklogPort';
import { DeleteProductBacklogPort } from 'src/core/productBacklog/port/primary/DeleteProductBacklogPort';
import { GetProductBacklogsPort } from 'src/core/productBacklog/port/primary/GetProductBacklogsPort';
import { UpdateProductBacklogPort } from 'src/core/productBacklog/port/primary/UpdateProductBacklogPort';
import { RESULT_TYPE } from 'src/shared/Result';
import { ProductBacklog } from '../model/ProductBacklog.model';

@Resolver()
export class ProductBacklogResolver {
  constructor(
    private readonly getProductBacklogsPort: GetProductBacklogsPort,
    private readonly createProductBacklogPort: CreateProductBacklogPort,
    private readonly updateProductBacklogPort: UpdateProductBacklogPort,
    private readonly deleteProductBacklogPort: DeleteProductBacklogPort,
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

  @Mutation(() => String)
  async updateProductBacklog(
    @Args({ name: 'id', type: () => String })
    id: string,
    @Args({ name: 'name', type: () => String, nullable: true })
    name?: string,
    @Args({ name: 'productOwnerId', type: () => String, nullable: true })
    productOwnerId?: string,
    @Args({ name: 'description', type: () => String, nullable: true })
    description?: string,
  ): Promise<string> {
    const updateResult =
      await this.updateProductBacklogPort.updateProductBacklog({
        id: id,
        name: name,
        productOwnerId: productOwnerId,
        description: description,
      });
    if (updateResult.resultType === RESULT_TYPE.FAILED) {
      return 'todo';
    }

    return updateResult.value;
  }

  @Mutation(() => String)
  async deleteProductBacklog(
    @Args({ name: 'id', type: () => String })
    id: string,
  ): Promise<string> {
    const deleteResult =
      await this.deleteProductBacklogPort.deleteProductBacklog({
        id: id,
      });
    if (deleteResult.resultType === RESULT_TYPE.FAILED) {
      return 'todo';
    }

    return deleteResult.value;
  }
}
