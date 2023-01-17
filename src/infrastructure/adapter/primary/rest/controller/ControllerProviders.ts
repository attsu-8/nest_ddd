import { CreateTaskUseCase } from 'src/core/application/useCase/CreateTaskUseCase';
import { GetAllTasksUseCase } from 'src/core/application/useCase/GetAllTasksUseCase';
import { UpdateTaskUseCase } from 'src/core/application/useCase/UpdateTaskUseCase';
import { CreateTaskUseCasePort } from 'src/core/port/primary/useCase/CreateTaskUseCasePort';
import { GetAllTasksUseCasePort } from 'src/core/port/primary/useCase/GetAllTasksUseCasePort';
import { UpdateTaskUseCasePort } from 'src/core/port/primary/useCase/UpdateTaskUseCasePort';

export default [
  {
    provide: CreateTaskUseCasePort,
    useClass: CreateTaskUseCase,
  },
  {
    provide: GetAllTasksUseCasePort,
    useClass: GetAllTasksUseCase,
  },
  {
    provide: UpdateTaskUseCasePort,
    useClass: UpdateTaskUseCase,
  },
];
