import { ResultType } from 'src/shared/Result';

export interface CreateProductBacklogRequest {
  name: string;
  description?: string;
  productOwnerId: string;
}

export abstract class CreateProductBacklogPort {
  abstract createProductBacklog(
    createProductBacklogRequest: CreateProductBacklogRequest,
  ): Promise<ResultType<string, Error>>;
}
