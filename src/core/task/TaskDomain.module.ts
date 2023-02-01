import { Module, Provider } from '@nestjs/common';
import { FactoryAdapterModule } from 'src/infrastructure/adapter/secondary/factory/FactoryAdapter.module';
import { RepositoryAdapterModule } from 'src/infrastructure/adapter/secondary/repository/RepositoryAdapter.module';
import { CreateTaskUseCase } from './application/useCase/CreateTaskUseCase';
import { DeleteTaskUseCase } from './application/useCase/DeleteTaskUseCase';
import { GetAllTasksUseCase } from './application/useCase/GetAllTasksUseCase';
import { UpdateTaskUseCase } from './application/useCase/UpdateTaskUseCase';
import { DuplicateTaskChecker } from './domain/service/DuplicateTaskChecker';
import { CreateTaskUseCasePort } from './port/primary/useCase/CreateTaskUseCasePort';
import { DeleteTaskUseCasePort } from './port/primary/useCase/DeleteTaskUseCasePort';
import { GetAllTasksUseCasePort } from './port/primary/useCase/GetAllTasksUseCasePort';
import { UpdateTaskUseCasePort } from './port/primary/useCase/UpdateTaskUseCasePort';

const useCaseProviders: Provider<
  CreateTaskUseCase | GetAllTasksUseCase | UpdateTaskUseCase | DeleteTaskUseCase
>[] = [
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

@Module({
  imports: [
    FactoryAdapterModule,
    RepositoryAdapterModule.register(process.env.REPOSITORY_TYPE),
  ],
  providers: [...useCaseProviders, DuplicateTaskChecker],
  exports: [...useCaseProviders, DuplicateTaskChecker],
})
export class TaskDomainModule {}
