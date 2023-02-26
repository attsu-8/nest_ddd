import { ResultType } from 'src/shared/Result';

export interface DeleteBacklogItemRequest {
  id: string;
}

export abstract class DeleteBacklogItemPort {
  abstract deleteBacklogItem(
    deleteBacklogItemRequest: DeleteBacklogItemRequest,
  ): Promise<ResultType<string, Error>>;
}
