import { CreateTaskUseCase } from 'src/core/application/useCase/CreateTaskUseCase';
import { DuplicateTaskChecker } from 'src/core/domain/task/service/DuplicateTaskChecker';
import { CreateTaskUseCasePort } from 'src/core/port/primary/useCase/CreateTaskUseCasePort';

export default [
  {
    provide: CreateTaskUseCasePort,
    useClass: CreateTaskUseCase,
  },
];
