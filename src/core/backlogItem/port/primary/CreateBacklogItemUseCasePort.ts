import { DateTime } from 'luxon';
import { ResultType } from 'src/shared/Result';

interface TaskCommand {
  name: string;
  description?: string;
  deadline: DateTime;
  status: number;
  userId: string;
}

export interface CreateBacklogItemCommand {
  story: string;
  storyPoint: number;
  backlogItemPriority: number;
  description?: string;
  tasks: TaskCommand[];
}

export abstract class CreateBacklogItemUseCasePort {
  abstract execute(
    createBacklogItemCommand: CreateBacklogItemCommand,
  ): Promise<ResultType<string, Error>>;
}
