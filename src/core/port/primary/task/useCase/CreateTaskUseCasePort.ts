export interface CreateTaskCommand {
  name: string;
}

export abstract class CreateTaskUseCasePort {
  abstract handle(createTaskCommand: CreateTaskCommand): Promise<void>;
}
