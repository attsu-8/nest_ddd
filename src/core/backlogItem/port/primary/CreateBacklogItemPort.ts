import { DateTime } from 'luxon';
import { ResultType } from 'src/shared/Result';

interface CreateTaskRequest {
  name: string;
  deadline: DateTime;
  status: number;
  userId: string;
  description?: string;
}

export interface CreateBacklogItemRequest {
  story: string;
  storyPoint: number;
  backlogItemPriority: number;
  productBacklogId: string;
  tasks: CreateTaskRequest[];
  description?: string;
}

export abstract class CreateBacklogItemPort {
  abstract createBacklogItem(
    createBacklogItemRequest: CreateBacklogItemRequest,
  ): Promise<ResultType<string, Error>>;
}
