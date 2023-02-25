import { ResultType } from 'src/shared/Result';

export interface UpdateProductBacklogRequest {
  id: string;
  name?: string;
  productOwnerId?: string;
  description?: string;
}

export abstract class UpdateProductBacklogPort {
  abstract updateProductBacklog(
    updateProductBacklogRequest: UpdateProductBacklogRequest,
  ): Promise<ResultType<string, Error>>;
}
