import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { ProductBacklogEntity } from '../../domain/ProductBacklogEntiry';
import {
  CreateProductBacklogPort,
  CreateProductBacklogRequest,
} from '../../port/primary/CreateProductBacklogPort';
import { ProductBacklogRepositoryPort } from '../../port/secondary/ProductRepositoryPort';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateProductBacklogUseCase implements CreateProductBacklogPort {
  constructor(
    private readonly productBacklogRepositoryPort: ProductBacklogRepositoryPort,
  ) {}
  async createProductBacklog(
    createProductBacklogRequest: CreateProductBacklogRequest,
  ): Promise<ResultType<string, Error>> {
    const productBacklogEntity = ProductBacklogEntity.create({
      id: uuidv4(),
      name: createProductBacklogRequest.name,
      description: createProductBacklogRequest.description,
      productOwnerId: createProductBacklogRequest.productOwnerId,
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
