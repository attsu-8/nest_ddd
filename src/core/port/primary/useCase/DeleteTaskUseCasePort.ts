export interface DeleteTaskCommand {
  id: number;
}

export abstract class DeleteTaskUseCasePort {
  abstract handle(deleteTaskCommand: DeleteTaskCommand): Promise<void>;
}
