import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { ProductBacklogEntity } from '../../domain/ProductBacklogEntiry';
import { GetProductBacklogsPort } from '../../port/primary/GetProductBacklogsPort';
import { ProductBacklogRepositoryPort } from '../../port/secondary/ProductRepositoryPort';

@Injectable()
export class GetProductBacklogsUseCase implements GetProductBacklogsPort {
  constructor(
    private readonly productBacklogRepositoryPort: ProductBacklogRepositoryPort,
  ) {}
  async getProductBacklogs(): Promise<
    ResultType<ProductBacklogEntity[], Error>
  > {
    const productBacklogEntities =
      await this.productBacklogRepositoryPort.findAll();
    if (productBacklogEntities.resultType === RESULT_TYPE.FAILED) {
      return productBacklogEntities;
    }

    return productBacklogEntities;
  }
}
