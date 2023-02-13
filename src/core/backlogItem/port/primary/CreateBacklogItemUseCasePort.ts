import { DateTime } from 'luxon';
import { ResultType } from 'src/infrastructure/adapter/secondary/repository/Result';

interface TaskCommand {
  taskName: string;
  description?: string;
  deadline: DateTime;
  status: number;
  userId: number;
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
  ): Promise<ResultType<number, Error>>;
}
