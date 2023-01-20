export interface UpdateTaskCommand {
  id: number;
  name: string;
  done: boolean;
}

export abstract class UpdateTaskUseCasePort {
  abstract handle(updateTaskCommand: UpdateTaskCommand): Promise<void>;
}
