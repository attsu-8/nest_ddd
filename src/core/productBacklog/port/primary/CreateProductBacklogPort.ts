import { ResultType } from 'src/shared/Result';

export interface CreateProductBacklogRequest {
  name: string;
  productOwnerId: string;
  description?: string;
}

export abstract class CreateProductBacklogPort {
  abstract createProductBacklog(
    createProductBacklogRequest: CreateProductBacklogRequest,
  ): Promise<ResultType<string, Error>>;
}
