import { CreateTaskCommand } from 'src/core/application/useCase/commands/CreateTaskCommand';

export abstract class CreateTaskUseCasePort {
  abstract handle(createTaskCommand: CreateTaskCommand): Promise<void>;
}
