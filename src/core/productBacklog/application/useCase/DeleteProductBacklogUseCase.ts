import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import {
  DeleteProductBacklogPort,
  DeleteProductBacklogRequest,
} from '../../port/primary/DeleteProductBacklogPort';
import { ProductBacklogRepositoryPort } from '../../port/secondary/ProductRepositoryPort';

@Injectable()
export class DeleteProductBacklogUseCase implements DeleteProductBacklogPort {
  constructor(
    private readonly productBacklogRepositoryPort: ProductBacklogRepositoryPort,
  ) {}
  async deleteProductBacklog(
    deleteProductBacklogRequest: DeleteProductBacklogRequest,
  ): Promise<ResultType<string, Error>> {
    const deleteResult = await this.productBacklogRepositoryPort.delete(
      deleteProductBacklogRequest.id,
    );
    if (deleteResult.resultType === RESULT_TYPE.FAILED) {
      return deleteResult;
    }

    return deleteResult;
  }
}
