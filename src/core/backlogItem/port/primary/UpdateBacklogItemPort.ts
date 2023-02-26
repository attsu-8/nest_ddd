import { DateTime } from 'luxon';
import { ResultType } from 'src/shared/Result';

interface UpdateTaskRequest {
  id: string;
  name?: string;
  deadline?: DateTime;
  status?: number;
  userId?: string;
  description?: string;
}

export interface UpdateBacklogItemRequest {
  id: string;
  story?: string;
  storyPoint?: number;
  backlogItemPriority?: number;
  productBacklogId?: string;
  tasks?: UpdateTaskRequest[];
  description?: string;
}

export abstract class UpdateBacklogItemPort {
  abstract updateBacklogItem(
    updateBacklogItemRequest: UpdateBacklogItemRequest,
  ): Promise<ResultType<string, Error>>;
}
