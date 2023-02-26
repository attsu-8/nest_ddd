import { Injectable } from '@nestjs/common';
import { ResultSucceeded, ResultType, RESULT_TYPE } from 'src/shared/Result';
import {
  UpdateProductBacklogPort,
  UpdateProductBacklogRequest,
} from '../../port/primary/UpdateProductBacklogPort';
import { ProductBacklogRepositoryPort } from '../../port/secondary/ProductRepositoryPort';

@Injectable()
export class UpdateProductBacklogUseCase implements UpdateProductBacklogPort {
  constructor(
    private readonly productBacklogRepositoryPort: ProductBacklogRepositoryPort,
  ) {}
  async updateProductBacklog(
    updateProductBacklogRequest: UpdateProductBacklogRequest,
  ): Promise<ResultType<string, Error>> {
    if (
      !updateProductBacklogRequest.description &&
      !updateProductBacklogRequest.name &&
      !updateProductBacklogRequest.productOwnerId
    ) {
      return new ResultSucceeded(updateProductBacklogRequest.id);
    }

    const productBacklogEntity =
      await this.productBacklogRepositoryPort.findOneById(
        updateProductBacklogRequest.id,
      );
    if (productBacklogEntity.resultType === RESULT_TYPE.FAILED) {
      return productBacklogEntity;
    }

    const updateEntityResult = productBacklogEntity.value.update(
      updateProductBacklogRequest,
    );
    if (updateEntityResult.resultType === RESULT_TYPE.FAILED) {
      return updateEntityResult;
    }

    const storeResult = await this.productBacklogRepositoryPort.store(
      updateEntityResult.value,
    );
    if (storeResult.resultType === RESULT_TYPE.FAILED) {
      return storeResult;
    }

    return storeResult;
  }
}
