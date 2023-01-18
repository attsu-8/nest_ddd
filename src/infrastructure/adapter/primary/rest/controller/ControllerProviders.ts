import { CreateTaskUseCase } from 'src/core/application/task/useCase/CreateTaskUseCase';
import { DeleteTaskUseCase } from 'src/core/application/task/useCase/DeleteTaskUseCase';
import { GetAllTasksUseCase } from 'src/core/application/task/useCase/GetAllTasksUseCase';
import { UpdateTaskUseCase } from 'src/core/application/task/useCase/UpdateTaskUseCase';
import { CreateTaskUseCasePort } from 'src/core/port/primary/task/useCase/CreateTaskUseCasePort';
import { DeleteTaskUseCasePort } from 'src/core/port/primary/task/useCase/DeleteTaskUseCasePort';
import { GetAllTasksUseCasePort } from 'src/core/port/primary/task/useCase/GetAllTasksUseCasePort';
import { UpdateTaskUseCasePort } from 'src/core/port/primary/task/useCase/UpdateTaskUseCasePort';

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
  {
    provide: DeleteTaskUseCasePort,
    useClass: DeleteTaskUseCase,
  },
];
