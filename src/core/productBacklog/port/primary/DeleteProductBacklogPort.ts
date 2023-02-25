import { ResultType } from 'src/shared/Result';

export interface DeleteProductBacklogRequest {
  id: string;
}

export abstract class DeleteProductBacklogPort {
  abstract deleteProductBacklog(
    deleteProductBacklogRequest: DeleteProductBacklogRequest,
  ): Promise<ResultType<string, Error>>;
}
