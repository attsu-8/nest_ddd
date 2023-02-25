import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { ProductBacklogEntity } from '../domain/ProductBacklogEntiry';
import {
  UpdateProductBacklogPort,
  UpdateProductBacklogRequest,
} from '../port/primary/UpdateProductBacklogPort';
import { ProductBacklogRepositoryPort } from '../port/secondary/ProductRepositoryPort';

@Injectable()
export class UpdateProductBacklogUseCase implements UpdateProductBacklogPort {
  constructor(
    private readonly productBacklogRepositoryPort: ProductBacklogRepositoryPort,
  ) {}
  async updateProductBacklog(
    updateProductBacklogRequest: UpdateProductBacklogRequest,
  ): Promise<ResultType<string, Error>> {
    const productBacklogEntity = ProductBacklogEntity.create({
      id: updateProductBacklogRequest.id,
      name: updateProductBacklogRequest.name,
      description: updateProductBacklogRequest.description,
      productOwnerId: updateProductBacklogRequest.productOwnerId,
    });
    if (productBacklogEntity.resultType === RESULT_TYPE.FAILED) {
      return productBacklogEntity;
    }

    const result = await this.productBacklogRepositoryPort.store(
      productBacklogEntity.value,
    );
    if (result.resultType === RESULT_TYPE.FAILED) {
      return result;
    }

    return result;
  }
}
