import { CreateTaskUseCase } from 'src/core/application/useCase/CreateTaskUseCase';
import { GetAllTasksUseCase } from 'src/core/application/useCase/GetAllTasksUseCase';
import { DuplicateTaskChecker } from 'src/core/domain/task/service/DuplicateTaskChecker';
import { CreateTaskUseCasePort } from 'src/core/port/primary/useCase/CreateTaskUseCasePort';
import { GetAllTasksUseCasePort } from 'src/core/port/primary/useCase/GetAllTasksUseCasePort';

export default [
  {
    provide: CreateTaskUseCasePort,
    useClass: CreateTaskUseCase,
  },
  {
    provide: GetAllTasksUseCasePort,
    useClass: GetAllTasksUseCase,
  },
];
